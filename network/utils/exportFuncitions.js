
const controlleW = require('../../services/metaWhatsApp/whatsApp.controller');
const Boom = require('@hapi/boom');

exports.webhookGet = (req, res) => {
    try {
        const rta = controlleW.verifyToken(req, res)
        res.status(200).send(rta);
    } catch (error) {
        next(error)
    }
};

exports.webhookPost = async (req, res) => {
    try {
        let body = req.body;

        const rta = await controlleW.gestionarEntradaDeMensages(body)

        res.status(200).json(rta)

    } catch (error) {
        console.error(error);
        next(error)
    }
};

exports.plantillaConfirmacion = async (req, res) => {
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
};

exports.mandarMensaje = async (req, res) => {
    try {
        let { phone, text } = req.body;
        console.log("phone, text", phone, text)

        const envioPlantilla = await controlleW.mandarMensageApi({ phone, text })

        res.json({ body: envioPlantilla })

    } catch (error) {
        console.error(error);
        next(error)
    }
};

exports.mandarMensajeDespacho = async (req, res) => {
    try {
        let { phone, text } = req.body;
        console.log("phone, text", phone, text)

        const envioPlantilla = await controlleW.mandarMensageApiDespacho({ phone, text })

        res.json({ body: envioPlantilla })

    } catch (error) {
        console.error(error);
        next(error)
    }
};
