const { URL_WEBHOOK_CONFIRMACION } = require(`./../confDotenv`)

async function consultarPedidoIdButton(idButton) {
    try {
        const body = {
            idButton
        }

        const url = `${URL_WEBHOOK_CONFIRMACION}/api/pedidos/pedidoConfirmado`

        const options = {
            method: "POST",
            headers: {
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

module.exports = consultarPedidoIdButton