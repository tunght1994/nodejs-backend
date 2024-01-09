const app = require("./src/app");

const PORT = process.env.PORT || 3056

const server = app.listen(PORT, () => {
    console.log(`start server ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => console.log('exit server express'))
})
