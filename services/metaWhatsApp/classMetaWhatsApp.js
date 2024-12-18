const ENV = require(`./../../network/confDotenv`)


class MetaWhatsApp {
    token = ENV.JWT_TOKEN;
    phone_number_id = ENV.NUMBER_ID;
    verify_token = ENV.VERIFY_TOKEN;
    version = `17.0`

    URL_API = `https://graph.facebook.com/v${this.version}`

    constructor() {

    }

    async sendText({ phone_number_id = this.phone_number_id, from, msg_body }) {
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

            if (res.status == '400') throw data

            return data
        } catch (error) {
            throw error
        }
    }
    async sendTemplate({ phone_number_id = this.phone_number_id, from, text1, templateName }) {
        try {
            console.log(`[sendTemplateConfirmacion]  phone_number_id ${phone_number_id} from ${from} text ${text1}`);
            const body = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": from,
                "type": "template",
                "template": {
                    "name": templateName,
                    "language": {
                        "code": "es"
                    }
                }
            }
            //si tiene un parametro de texto, osea una variable , lo ponesmo 
            if (text1) {
                body.template.components = [
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
            console.log(`body`, JSON.stringify(body))

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
    async sendTemplateImg({
        phone_number_id = this.phone_number_id,
        from,
        text1,
        text2,
        imageUrl,
        templateName
    }) {
        try {
            console.log(`[sendTemplateImg] phone_number_id: ${phone_number_id}, from: ${from}, text1: ${text1}, text2: ${text2}`);

            const body = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": from,
                "type": "template",
                "template": {
                    "name": templateName,
                    "language": {
                        "code": "es" // Idioma de la plantilla
                    },
                    "components": []
                }
            };

            // Agregar la imagen al encabezado si se proporciona una URL
            if (imageUrl) {
                body.template.components.push({
                    "type": "header",
                    "parameters": [
                        {
                            "type": "image",
                            "image": { "link": imageUrl }
                        }
                    ]
                });
            }

            // Agregar variables de texto al cuerpo
            const textParameters = [];
            if (text1) {
                textParameters.push({
                    "type": "text",
                    "text": text1
                });
            }
            if (text2) {
                textParameters.push({
                    "type": "text",
                    "text": text2
                });
            }

            if (textParameters.length > 0) {
                body.template.components.push({
                    "type": "body",
                    "parameters": textParameters
                });
            }

            console.log(`body`, JSON.stringify(body));

            const url = `${this.URL_API}/${phone_number_id}/messages`;
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            };

            const res = await fetch(url, options);
            const data = await res.json();

            return data;
        } catch (error) {
            console.error("Error en sendTemplateImg:", error);
            throw error;
        }
    }

    async sendTemplateConfirmacion({ phone_number_id = this.phone_number_id, from, text1 }) {
        try {
            return await this.sendTemplate({ phone_number_id, from, templateName: `confirmacion_pedido_sin_variable` })
        } catch (error) {
            throw error
        }
    }
    async sendTemplateMetodosDePagoPregunta({ phone_number_id = this.phone_number_id, from, text1, text2 }) {
        try {
            const imageUrl = `https://instagram.feoh8-1.fna.fbcdn.net/v/t51.29350-15/457747656_1177566940349462_6786420392624365996_n.jpg?stp=dst-jpg_e15_tt7&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=5DyXYIU60rwQ7kNvgHklaI_&_nc_gid=e6a082b5422247c5bacaa9da017b8d45&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQ0Nzc5ODg1NjA5OTA4MDE0MQ%3D%3D.3-ccb7-5&oh=00_AYBpmXlp8OWkJlyGwBcXC42rb_BDUWKuZcs2hdwxKRkoBQ&oe=6758374A&_nc_sid=7a9f4b`

            return await this.sendTemplateImg({ phone_number_id, from, templateName: `mandar_metodos_de_pagos`, imageUrl, text1, text2 })
        } catch (error) {
            throw error
        }
    }
    async sendTemplateTest({ phone_number_id = this.phone_number_id, from, text1 }) {
        try {
            return await this.sendTemplate({ phone_number_id, from, templateName: `plantilla_de_test` })
        } catch (error) {
            throw error
        }
    }
    async sendTemplateDespachado({ phone_number_id = this.phone_number_id, from, text1 }) {
        try {
            return await this.sendTemplate({ phone_number_id, from, text1, templateName: `pedido_despachado` })
        } catch (error) {
            throw error
        }
    }
    async sendTextButton({ phone_number_id = this.phone_number_id, from, msg_body, actionButton }) {
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
    async sendUrlPreview({ phone_number_id = this.phone_number_id, from, urlMessage }) {
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
    async sendMediaQr({ phone_number_id = this.phone_number_id, from }) {
        try {
            console.log(`[sendMediaQr] from ${from} `);
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
                    "recipient_type": "individual",
                    "type": "image",
                    "image": {
                        "id": "286764157438059"
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