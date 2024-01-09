'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const SECONDS = 5000

//countConnect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`number connect ${numConnection}`)
}
// check over load
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        // example maximum number off connections based on number osf cores
        const maxConnections = numCores * 5

        if(numConnection > maxConnections){
            console.log('Connect overload detected')
            // notify.send(...)
        }

    }, SECONDS)
}

module.exports = {
    countConnect,
    checkOverload
}