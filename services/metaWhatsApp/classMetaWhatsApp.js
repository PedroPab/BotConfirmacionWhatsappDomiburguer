const ENV = require(`./../../network/confDotenv`)


class MetaWhatsApp {
    token = ENV.JWT_TOKEN;
    phone_number_id = ENV.NUMBER_ID;
    verify_token = ENV.VERIFY_TOKEN;
    version = `17.0`

    URL_API = `https://graph.facebook.com/v${this.version}`

    constructor() {

    }

    async sendText({phone_number_id = this.phone_number_id, from, msg_body}) {
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

    async sendTemplateConfirmacion({ phone_number_id = this.phone_number_id, from, text1 }) {
        try {
            console.log(`[sendTemplateConfirmacion]  phone_number_id ${phone_number_id} from ${from} text ${text1}`);
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
    async sendTextButton({phone_number_id = this.phone_number_id, from, msg_body, actionButton}) {
        try {
            console.log(`[sendTextButton]  phone_number_id ${phone_number_id} from ${from} text ${msg_body}`);
            const url = `${this.URL_API}/${phone_number_id}/messages`;
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: from,
                    text: { body: msg_body },
                    wa_action: actionButton,
                }),
            };
            const res = await fetch(url, options);
            const data = await res.json();

            return data;
        } catch (error) {
            throw error;
        }
    }
    async sendContac({ phone_number_id = this.phone_number_id, from }) {
        try {
            console.log(`[sendContac]  phone_number_id ${phone_number_id} from ${from}`);
            const url = `${this.URL_API}/${phone_number_id}/messages`;
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: from,
                    type: "contacts",
                    contacts: [
                        {
                            name: {
                                "formatted_name": "Domiburguer",
                                "first_name": "Domiburguer"
                            },
                            phones: [
                                {
                                    "phone": "+573506186772",
                                    "type": "WORK",
                                    "wa_id": "573506186772"
                                }
                            ]
                        }
                    ]
                }),
            };
            const res = await fetch(url, options);
            const data = await res.json();

            return data;
        } catch (error) {
            throw error;
        }
    }
    async sendUrlPreview({ phone_number_id = this.phone_number_id, from , urlMessage}) {
        try {
            console.log(`[sendUrlPreview]  phone_number_id ${phone_number_id} from ${from} urlMessage ${urlMessage}`);
            const url = `${this.URL_API}/${phone_number_id}/messages`;
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: from,
                    "text": {
                        "preview_url": true,
                        "body": urlMessage
                    }
                }),
            };
            const res = await fetch(url, options);
            const data = await res.json();

            return data;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = MetaWhatsApp