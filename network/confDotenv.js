const environment = process.env.NODE_ENV || 'development'
const path = require('path');

const envFile = path.resolve(__dirname, `./../.env.${environment}`)
require('dotenv').config({ path: envFile })

console.log(`corriendo en ${environment}`)

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3008,
    JWT_TOKEN: process.env.JWT_TOKEN,
    NUMBER_ID: process.env.NUMBER_ID,
    VERIFY_TOKEN: process.env.VERIFY_TOKEN,
    URL_WEBHOOK_CONFIRMACION: process.env.URL_WEBHOOK_CONFIRMACION,
}