const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const clients = {};

async function startClient(id, ws) {
    let err = false;
    try {
        await clients[id]?.getState();
    } catch (e) {
        err = true;
    } finally {
        if (err || !clients[id]) {
            clients[id] = new Client({
                authStrategy: new LocalAuth({
                    clientId: id
                }),
                webVersionCache: {
                    type: 'remote',
                    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html'
                }
            });

            clients[id].on('qr', (qr) => {
                console.log("QR Code Generated");
                qrcode.generate(qr, { small: true });
                ws.send('qr: ' + qr)
            });

            clients[id].on('ready', async () => {
                console.log(`Whatsapp Client ${id} is ready!`)
                ws.send(`Whatsapp Client ${id} is ready!`);
            });

            clients[id].initialize().catch(err => {
                console.error(`Error initializing client ${id}:`, err);
            });
        } else {
            ws.send(`Session ${id} is already connected`);
        }
    }
}

async function logoutClient(id) {
    if (clients[id]) {
        try {
            await clients[id].logout();
            console.log(`Client ${id} has logged out`);
        } catch (err) {
            console.error(`Error logging out client ${id}:`, err);
        }
    } else {
        console.log(`No active client session found for ID: ${id}`);
    }
}

async function destroyClient(id) {
    if (clients[id]) {
        try {
            await clients[id].destroy();
            console.log(`Client ${id} has been destroyed`);
        } catch (err) {
            console.error(`Error destroying client ${id}:`, err);
        } finally {
            delete clients[id];
        }
    } else {
        console.log(`No active client session found for ID: ${id}`);
    }
}

module.exports = { startClient, logoutClient, destroyClient };