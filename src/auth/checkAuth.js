'use strict'

const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()

        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error key'
            })
        }

        // check objKey
        const objKey = await findById(key)
        if(!objKey){ 
            return res.status(403).json({
                message: 'Forbidden Error objKey'
            })
        }

        req.objKey = objKey
        return next

    } catch (error) {
        
    }
}

const permission = (permission) => {
    console.log('first', permission)
    return (req, res, next) => {
        console.log('req', req)
        // if (!req.objKey.permissions) {
        //     return res.status(403).json({
        //         message: 'permission dinied'
        //     })
        // }

        // console.log('permission', req.objKey.permissions)
        // const validPermission = req.objKey.permissions.includes(permission)
        // if(!validPermission) {
        //     return res.status(403).json({
        //         message: 'permission dinied'
        //     })
        // }

        // return next()
    }
}

module.exports = {
    apiKey,
    permission
}