'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helper/check.connect')
const { db: {host, port, name}} = require('../config/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`

const uri = "mongodb+srv://hothanhtung12:Tung%40170894@cluster0.a4wxxao.mongodb.net/?retryWrites=true&w=majority";

class Database{
    constructor() {
        this.connect()
    }

    // connect
    connect(type = 'mongodb'){
        if(1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }

        mongoose.connect(uri).then(_ => {
            console.log('Connect mongodb Success')
        })
        .catch(err => console.log('Connect mongodb err::', err.message))
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb