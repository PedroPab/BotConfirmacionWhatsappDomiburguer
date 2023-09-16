const express = require('express');
const controlleW = require('../../../services/metaWhatsApp/whatsApp.controller');
const Boom = require('@hapi/boom');

const routes = express.Router()

routes.get("/webhook", (req, res, next) => {
    /**
    * UPDATE YOUR VERIFY TOKEN
    *This will be the Verify Token value when you set up webhook
    **/
    try {
        const rta = controlleW.verifyToken(req, res)
        res.status(200).send(rta);
    } catch (error) {
        next(error)
    }
});


routes.post("/webhook", async (req, res, next) => {
    try {

        let body = req.body;

        //derminas si es la respuesta de un texto  y es valdio
        const isValid = controlleW.isMessageValid(body)

        if (!isValid) {
            console.log(`no es un mensage valido`)
            res.sendStatus(200)
            return
        }

        console.log("body post webhook", JSON.stringify(body, null, 2))


        //miramos si es un boton  de ruesta
        const isButton = controlleW.isButtonValid(body)

        if (!isButton) {
            //mandamos el mensage por defecto o no mandamos nada

            // const rta = await controlleW.repitMessage(body)
            const rta = await controlleW.messageDefault(body)
            res.sendStatus(200)
            return
        }

        // se precion el botn de confirmacion
        // recogemos el id del bon y el numero de telefo
        const { clientPhone, idButtonContext } = controlleW.recoletDataButtonConfirmar(body)
        console.log("🚀 ~ file: rutas.js:44 ~ routes.post ~ clientPhone, idButtonContext:", clientPhone, idButtonContext)
        //mandamos un mensage de gracias
        

        res.sendStatus(201)

    } catch (error) {
        console.error(error);
        next(error)
    }
});

routes.post(`/plantillaConfirmacion`, async (req, res, next) => {
    try {
        let body = req.body;
        console.log("body", body)

        const envioPlantilla = await controlleW.eviarPlantillaConfirmacion(body)
        console.log("🚀 ~ file: rutas.js:63 ~ routes.post ~ envioPlantilla:", envioPlantilla)

        res.send(`ok`)

    } catch (error) {
        console.error(error);
        next(error)
    }
});





module.exports = routes