const { expect } = require('chai');
const MetaWhatsApp = require('./../services/metaWhatsApp/classMetaWhatsApp'); // Asegúrate de proporcionar la ruta correcta

describe('MetaWhatsApp', () => {
    let metaWhatsApp;
    let phoneTest = `573054489598`

    before(() => {
        // Antes de cada prueba, inicializa una nueva instancia de MetaWhatsApp
        metaWhatsApp = new MetaWhatsApp();
    });

    describe('sendText', () => {
        it('debería enviar un mensaje de texto', async () => {
            const response = await metaWhatsApp.sendText({ from: phoneTest, msg_body: 'Hola mundo mensage del test 1' });
            expect(response).to.have.property('messaging_product').to.equal('whatsapp');
            expect(response.contacts[0]).to.have.property('input')
            expect(response.contacts[0]).to.have.property('wa_id')
            expect(response.messages[0]).to.have.property('id').to.be.a('string');

        });
    });

    describe('sendTemplateConfirmacion', () => {
        it('debería enviar una plantilla de confirmación', async () => {
            const response = await metaWhatsApp.sendTemplateConfirmacion({
                from: phoneTest,
                text1: 'Parametro de la plantilla de confirmaicon'
            });
            expect(response).to.have.property('messaging_product').to.equal('whatsapp');
            expect(response.contacts[0]).to.have.property('input')
            expect(response.contacts[0]).to.have.property('wa_id')
            expect(response.messages[0]).to.have.property('id').to.be.a('string');
        });
    });

    describe('sendTextButton', () => {
        it('debería enviar un mensaje de texto con botón', async () => {
            const response = await metaWhatsApp.sendTextButton({ from: phoneTest, msg_body: 'Mensaje con botón', actionButton: 'accion' });
            expect(response).to.have.property('messaging_product').to.equal('whatsapp');
            expect(response.contacts[0]).to.have.property('input')
            expect(response.contacts[0]).to.have.property('wa_id')
            expect(response.messages[0]).to.have.property('id').to.be.a('string');
        });
    });

    describe('sendContac', () => {
        it('debería enviar un mensaje de contacto', async () => {
            const response = await metaWhatsApp.sendContac({ from: phoneTest });
            expect(response).to.have.property('messaging_product').to.equal('whatsapp');
            expect(response.contacts[0]).to.have.property('input')
            expect(response.contacts[0]).to.have.property('wa_id')
            expect(response.messages[0]).to.have.property('id').to.be.a('string');
        });
    });

    describe('sendMediaQr', () => {
        it('debería enviar una imagen', async () => {
            const response = await metaWhatsApp.sendMediaQr({ from: phoneTest });
            expect(response).to.have.property('messaging_product').to.equal('whatsapp');
            expect(response.contacts[0]).to.have.property('input')
            expect(response.contacts[0]).to.have.property('wa_id')
            expect(response.messages[0]).to.have.property('id').to.be.a('string');
        });
    });
});
