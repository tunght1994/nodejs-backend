require('dotenv').config()
const express = require("express");
const morgan =  require('morgan')
const {default: helmet} = require('helmet');
const compression = require("compression");

const app = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// morgan('combined') // sử dụng cho product
// morgan('common')
// morgan('short')
// morgan('tiny')
// morgan('dev')

// init db
require('./dbs/init.mongodb')

// init routes
app.use('/', require('./routes'))

// handle error


module.exports = app