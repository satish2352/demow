const express = require('express');
const url = require('url');
require('dotenv').config();
const cors = require('cors');
const { startClient, logoutClient, destroyClient } = require('./WhatsappClient');
const WebSocketServer = require('ws').Server
let connections = {}
const app = express();
app.use(express.json());
app.use(cors());

const wss = new WebSocketServer({ port: 3003 })
wss.on('connection', async function (ws, req) {
    const parameters = url.parse(req.url, true).query
    const id = parameters.id
    if(!connections[id]){
        connections[id] = ws
        ws.send(`WS Client: ${id}`)
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.post('/message', async (req, res) => {
    try {
        res.send('Msg Called');
        // const file = req.file;
        // const clientId = req.body.clientId;
        // await sendMessage(req.body.phoneNumber, req.body.message, clientId, file);
        // res.send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

app.get('/:id/start', async (req, res) => {
    const id = req.params.id;
    const ws  = connections[id]
    try {
        await startClient(id, ws);
        res.send('Client started');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error starting client');
    }
});

app.get('/:id/logout', async (req, res) => {
    const id = req.params.id;
    try {
        await logoutClient(id);
        res.send('Client logged out');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging out client');
    }
});

app.get('/:id/destroy', async (req, res) => {
    const id = req.params.id;
    try {
        await destroyClient(id);
        res.send('Client destroyed');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error destroying client');
    }
});

app.get('/:id/ready', async (req, res) => {
    const id = req.params.id;
    try {
        await readyListen(id, res);
        res.send('Client is ready');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error checking client readiness');
    }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



