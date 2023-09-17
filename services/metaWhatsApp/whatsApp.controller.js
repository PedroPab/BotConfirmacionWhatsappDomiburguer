const generarEmojiAleatorio = require("../../utils/emogisRandom");
const consultarPedidoIdButton = require("../../utils/pedidoConfirmado");
const MetaWhatsApp = require("./classMetaWhatsApp");
const Boom = require(`@hapi/boom`)
const WhatsApp = new MetaWhatsApp()
// info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages

const verifyToken = (req, res) => {
    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === WhatsApp.verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            return challenge
            // res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            return Boom.conflict()
        }
    }
}

const repitMessage = async (body) => {
    try {
        let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
        let msg_body = body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

        const rta = await WhatsApp.sendText(phone_number_id, from, msg_body);
        return rta

    } catch (error) {
        throw error
    }
}


const messageDefault = async (body) => {
    try {
        let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
        const emoji = generarEmojiAleatorio()
        const msg_body = `${emoji} Este chat es solo para confirmar el pedido. \n Si deseas hablar con alguien puedes hacerlo por este otro chat +57 350 6186772`

        const rta = await WhatsApp.sendText(phone_number_id, from, msg_body);
        return rta

    } catch (error) {
        throw error
    }
}




const isMessageValid = (body) => {
    if (body.object &&
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0] &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]) {
        return true
    } else {
        return false
    }
}


const isButtonValid = (body) => {
    let messageType = body.entry[0].changes[0].value.messages[0].type

    if (messageType != `button`) {
        console.log(`no es de tipo boton es de tipo: ${messageType}`)
        console.log(body.entry[0].changes[0].value.messages[0])
        return false
    }
    const payloadButton = body.entry[0].changes[0].value.messages[0].button.payload

    if (payloadButton != `Confirmar`) return false

    return true

}


const recoletDataButtonConfirmar = (body) => {
    let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
    let idButtonContext = body.entry[0].changes[0].value.messages[0].context.id; // extract the message text from the webhook payload
    return { idButtonContext, clientPhone: from }
}

const eviarPlantillaConfirmacion = async (data) => {
    try {
        const plantillaMensage = await WhatsApp.sendTemplateConfirmacion({ from: data.phone, text1: data.name })

        const idMenssage = plantillaMensage.messages[0].id

        return idMenssage
    } catch (error) {
        throw Boom.conflict(`No se pudo mandar la plantilla ${error}`)
    }
}


const madarRespuestaConfirmaicon = async (body) => {
    try {

        // recogemos el id del bon y el numero de telefo
        const { clientPhone, idButtonContext } = recoletDataButtonConfirmar(body)
        console.log("🚀 ~ file: whatsApp.controller.js:117 ~ madarRespuestaConfirmaicon ~ idButtonContext:", idButtonContext)

        //consultamos cual es el pedido del cliete segun el idButoon
        //se confirma de uan vez el pedido
        const pedido = await consultarPedidoIdButton(idButtonContext)

        //mandamos mensaje de listo 
        const msg_body = `listo tu pedido se confirmo con exito, ${pedido.body.id}`
        const message = await WhatsApp.sendText(undefined, pedido.body.phone, msg_body);

        return

    } catch (error) {
        throw error
    }
}




const gestionarEntradaDeMensages = async (body) => {
    try {
        //derminas si es la respuesta de un texto  y es valdio
        const isValid = isMessageValid(body)

        if (!isValid) {
            console.log(`no es un mensage valido`)

            return 'no es un mensage valido'
        }

        console.log("body post webhook", JSON.stringify(body, null, 2))


        //miramos si es un boton  de ruesta
        const isButton = isButtonValid(body)

        if (!isButton) {
            //mandamos el mensage por defecto o no mandamos nada
            const rta = await messageDefault(body)
            return rta
        }

        // se precion el botn de confirmacion

        //mandamos los datos del pedido
        const mensageConfirmado = await madarRespuestaConfirmaicon(body)

        return
    } catch (error) {
        throw error
    }
}




module.exports = {
    verifyToken,
    repitMessage,
    messageDefault,
    isMessageValid,
    isButtonValid,
    recoletDataButtonConfirmar,
    eviarPlantillaConfirmacion,
    gestionarEntradaDeMensages,
}