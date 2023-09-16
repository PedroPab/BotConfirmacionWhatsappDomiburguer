

class MetaWhatsApp {
    token = process.env.JWT_TOKEN;
    phone_number_id = process.env.NUMBER_ID;
    verify_token = process.env.VERIFY_TOKEN;
    version = `17.0`

    URL_API = `https://graph.facebook.com/v${this.version}`

    constructor() {

    }

    async sendText(phone_number_id, from, msg_body) {
        try {
            console.log(`[sendText]  phone_number_id ${phone_number_id} from ${from} text ${msg_body}`);
            const url = `${this.URL_API}/${phone_number_id}/messages`
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: from,
                    text: { body: msg_body }
                })
            }
            const res = await fetch(url, options);
            const data = await res.json()

            return data
        } catch (error) {
            throw error
        }
    }

    async sendTemplateConfirmacion({phone_number_id = this.phone_number_id, from, text1}) {
        try {
            console.log(`[sendText]  phone_number_id ${phone_number_id} from ${from} text ${text1}`);
            const body = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": from,
                "type": "template",
                "template": {
                    "name": "confirmarcion_pedido",
                    "language": {
                        "code": "es"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": text1,
                                }
                            ]
                        }
                    ]
                }
            }
            const url = `${this.URL_API}/${phone_number_id}/messages`
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            const res = await fetch(url, options);
            const data = await res.json()

            return data
        } catch (error) {
            throw error
        }
    }

}

module.exports = MetaWhatsApp