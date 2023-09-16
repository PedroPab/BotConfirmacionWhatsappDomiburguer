require('dotenv').config()
const httpServer = require('./server/http')

const app = new httpServer()
app.start()