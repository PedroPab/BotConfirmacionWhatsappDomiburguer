const { expect } = require('chai');
const whatsAppController = require('../services/metaWhatsApp/whatsApp.controller'); // Asegúrate de proporcionar la ruta correcta

describe('MetaWhatsApp', () => {
    let metaWhatsApp;
    let phoneTest = `573054489598`

    let pedidoBody = {
        "body": {
            "id": "B6Fm1zGw6T9BCulJGpYf",
            "date": {
                "_seconds": 1695085238,
                "_nanoseconds": 439000000
            },
            "timelapseStatus": [
                {
                    "date": {
                        "_seconds": 1695085238,
                        "_nanoseconds": 439000000
                    },
                    "estado": "PendienteConfimacion",
                    "responsable": "ArceliuzAdmin"
                }
            ],
            "note": "Ru",
            "estado": "PendienteConfimacion",
            "address": {
                "address_complete": "Cl. 101b #74b-85, Pedregal, Medellín, Doce de Octubre, Medellín, Antioquia, Colombia",
                "coordinates": {
                    "lng": -75.5764272,
                    "lat": 6.2999347
                }
            },
            "clientId": "NHcbpIBKwFULd49jlFn8",
            "numeroDeOrdenDelDia": 7,
            "fee": "Transferencia",
            "duracionEstimada": {
                "text": "16 minutos",
                "value": 16
            },
            "phone": "+573054489598",
            "priceTotal": {
                "COP": "$38500",
                "priceTotal": 38500
            },
            "name": "Pedro Pablo",
            "pagoConfirmado": {
                "confirmado": false,
                "time": null
            },
            "order": [
                {
                    "colorPrimary": "#48804e",
                    "price": 16000,
                    "modifique": [],
                    "name": "Hamburguesa",
                    "description": "Hamburguesa artesanal",
                    "imagen": "https://cdn.fakercloud.com/avatars/timpetricola_128.jpg",
                    "colorSecondary": "#42490a",
                    "id": "2",
                    "type": "Producto"
                }
            ]
        }
    }



    // describe('Enviar mensage por defecto', () => {
    //     it('debería enviar un mensaje de un texto generico y el contacto', async () => {
    //         const response = await whatsAppController.messageDefault({ from: phoneTest, msg_body: 'Hola mundo mensage del test 1' });
    //         expect(response).to.have.property('messaging_product').to.equal('whatsapp');
    //         expect(response.contacts[0]).to.have.property('input')
    //         expect(response.contacts[0]).to.have.property('wa_id')
    //         expect(response.messages[0]).to.have.property('id').to.be.a('string');

    //     });
    // });


    describe('Enviar mensajes para las personas que piden por trasferencia ', () => {
        it('debería enviar un mensaje de un texto generico y el contacto', async () => {
            try {
                const response = await whatsAppController.mandarMensageTransferencia(pedidoBody);
                console.log("🚀 ~ file: whatsApp.controller.test.js:85 ~ it ~ response:", response)
                expect(response).to.not.throw(); // Verifica que no se arroje ningún error
            } catch (error) {
                throw new Error(error);
            }
        });
    });

});
