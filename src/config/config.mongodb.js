'use strict'

const dev = {
    app : {
        port: process.env.DEV_APP_PORT || 3055
    },
    db: {
        host: process.env.DEV_APP_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_APP_NAME || 'ShopDEV'
    }
}

const pro = {
    app : {
        port: process.env.DB_DB_PORT || 3055
    },
    db: {
        host: process.env.DB_DB_HOST || 'localhost',
        port: process.env.DB_DB_PORT || 27017,
        name: process.env.DB_DB_NAME || 'ShopDEV'
    }
}

const config = { dev , pro }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]