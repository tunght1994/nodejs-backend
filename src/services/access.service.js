"use strict";

const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utills");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step1: check email exists
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxx",
          messagee: "Shop already registered",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {

        const privateKey = crypto.randomBytes(64).toString('hex')
        const puclicKey = crypto.randomBytes(64).toString('hex')

        console.log({privateKey, puclicKey})

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          puclicKey,
          privateKey
        });

        if (!keyStore) {
          return {
            code: "xxx",
            messagee: "publicKeyString error",
          };
        }

        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          puclicKey,
          privateKey
        );

        console.log("Created Token Success", tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({fileds: ['id', 'name', 'email'] , object: newShop}),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "401",
        message: error.message,
        status: error,
      };
    }
  };
}

module.exports = AccessService;
