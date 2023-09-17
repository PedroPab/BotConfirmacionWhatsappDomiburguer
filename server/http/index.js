const express = require('express')
const routes = require(`./routes/rutas`)
const { PORT } = require(`./../../network/confDotenv`)


class httpServer {
    PORT = PORT
    app
    constructor() { }



    buildApp = () => {
        
        const handleErrors = (err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        }


        return this.app = express()
            .use(express.json())
            .use(routes)
            .use(handleErrors)
            .listen(this.PORT, () => {
                console.log(`App listen http://localhost:${this.PORT}`);
            })
            .on('error', (error) => {
                console.error(`Error starting server: ${error.message}`);
            });
    }

    start = () => {
        this.buildApp();
    }

    // Agrega un middleware para manejar errores




}

module.exports = httpServer
