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

        const rta = await controlleW.gestionarEntradaDeMensages(body)

        res.status(200).json(rta)

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

        res.json({ idButton: envioPlantilla })

    } catch (error) {
        console.error(error);
        next(error)
    }
});





module.exports = routes