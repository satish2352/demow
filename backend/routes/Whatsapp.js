const express = require('express')
const { startClient, logoutClient, destroyClient } = require('../WhatsappClient');
const WebSocketServer = require('ws').Server
const router = express.Router()

const wss = new WebSocketServer({ port: 3003 })
let ws;
wss.on('connection', async function (wsGot) {
  ws = wsGot
})

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/message', async (req, res) => {
    try {
        res.send('Msg Called');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

router.get('/:id/start', async (req, res) => {
    const id = req.params.id;
    // const ws  = connections[id]
    try {
        await startClient(id, ws);
        res.send('Client started');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error starting client');
    }
});

router.get('/:id/logout', async (req, res) => {
    const id = req.params.id;
    try {
        await logoutClient(id);
        res.send('Client logged out');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging out client');
    }
});

router.get('/:id/destroy', async (req, res) => {
    const id = req.params.id;
    try {
        await destroyClient(id);
        res.send('Client destroyed');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error destroying client');
    }
});

router.get('/:id/ready', async (req, res) => {
    const id = req.params.id;
    try {
        await readyListen(id, res);
        res.send('Client is ready');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error checking client readiness');
    }
});

module.exports = router