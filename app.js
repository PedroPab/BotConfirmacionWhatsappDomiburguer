// const express = require('express');
const functions = require('@google-cloud/functions-framework');
const {
    webhookGet,
    webhookPost,
    plantillaConfirmacion,
    mandarMensaje,
    mandarMensajeDespacho,
} = require('./network/utils/functions');
const Boom = require('@hapi/boom');


functions.http("webhook", async (req, res) => {
    try {
        const method = req.method;
        
        if (method === "POST") {
            // Lógica para el verbo POST
            await webhookPost(req, res)
        } else if (method === "GET") {
            // Lógica para el verbo GET
            webhookGet(req, res)
        }
        // ... y así sucesivamente para otros verbos
    } catch (error) {
        console.error(error);
        next(error)
    }
});

functions.http(`plantillaConfirmacion`, async (req, res) => {
 await plantillaConfirmacion(req, res)
});

functions.http(`mandarMensage`, async (req, res) => {
    await mandarMensaje(req, res)
});

functions.http(`mandarMensageDespacho`, async (req, res) => {
   await mandarMensajeDespacho(req, res)
});

