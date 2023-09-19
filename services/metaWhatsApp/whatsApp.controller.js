const { URL_WEBHOOK_CONFIRMACION } = require("../../network/confDotenv");
const generarEmojiAleatorio = require("../../network/utils/emogisRandom");
const consultarPedidoIdButton = require("../../network/utils/pedidoConfirmado");
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
        const msg_body = `${emoji} Este chat es solo para confirmar el pedido. \n Si deseas hablar con alguien puedes hacerlo por este otro chat`

        const rta = await WhatsApp.sendText({ phone_number_id, from, msg_body });
        const messageContac = await WhatsApp.sendContac({ from: from })
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
        const { idButtonContext } = recoletDataButtonConfirmar(body)
        console.log(`[madarRespuestaConfirmaicon] el id del boton es ${idButtonContext}`);
        //consultamos cual es el pedido del cliete segun el idButoon
        //se confirma de uan vez el pedido
        const pedido = await consultarPedidoIdButton(idButtonContext)

        if (!pedido?.body?.id) throw `no hay un pedido regisrtrso a este boton`
        //mandamos mensaje de listo 
        await mandarMensageListo(pedido);

        await mandarMensageTransferencia(pedido);


        return

    } catch (error) {
        throw error
    }
}

async function mandarMensageListo(pedido) {
    try {
        console.log(`mandando mensage de confirmacion lista`)

        const emoji = generarEmojiAleatorio();
        const msg_body = `${emoji} listo, tu pedido se confirmo con exito`;
        console.log("🚀 ~ file: whatsApp.controller.js:141 ~ mandarMensageListo ~ pedido.body.phone:", pedido.body)

        console.log("🚀 ~ file: whatsApp.controller.js:141 ~ mandarMensageListo ~ pedido.body.phone:", pedido.body.phone)

        const message = await WhatsApp.sendText({ from: pedido.body.phone, msg_body });

        const emoji2 = generarEmojiAleatorio();
        const msg_body2 = `${emoji} Puedes hacer seguimiento de tu pedido por medio de este enlace `;
        const button = `${URL_WEBHOOK_CONFIRMACION}/miPedido?idPedido=${pedido.body.id}`
        const message2 = await WhatsApp.sendText({ from: pedido.body.phone, msg_body: msg_body2 });
        const message3Url = await WhatsApp.sendUrlPreview({ from: pedido.body.phone, msg_body2, urlMessage: button })

    } catch (error) {
        throw error
    }
}

async function mandarMensageTransferencia(pedido) {
    try {
        if (pedido.body.fee !== `Transferencia`) return false
        const from = pedido.body.phone

        const msg_bodyCuentasB = `Nuestras cuentas son :
        💸Nequi:  300 6740076
        
        💸Bancolombia ahorros:  01897898027`


        const messageCuentas = await WhatsApp.sendText({ from, msg_body: msg_bodyCuentasB });
        const fotoQr = await WhatsApp.sendMediaQr({ from: from })

        const enviarAlChat = `El comprobante de la transferencia la envías a este chat`
        const message2 = await WhatsApp.sendText({ from, msg_body: enviarAlChat });
        const messageContac = await WhatsApp.sendContac({ from: from })


        return true

    } catch (error) {
        throw error
    }
}

async function mandarMensageApi({ phone, text }) {
    try {
        console.log(`mandando mensage de mandarMensageApi`)

        const msg_body = `${text}`;

        const message = await WhatsApp.sendText({ from: phone, msg_body });

        return message
    } catch (error) {
        throw Boom.badRequest(`no se pudo mandar el mensage`)
    }
}



const gestionarEntradaDeMensages = async (body) => {
    try {
        //derminas si es la respuesta de un texto  y es valdio
        const isValid = isMessageValid(body)

        if (!isValid) {
            // console.log(`no es un mensage valido`)
            throw 'no es un mensage valido'
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
    mandarMensageTransferencia,
    recoletDataButtonConfirmar,
    eviarPlantillaConfirmacion,
    mandarMensageApi,
    gestionarEntradaDeMensages,
}

