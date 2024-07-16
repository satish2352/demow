const { Client, LocalAuth } = require('whatsapp-web.js');
const Flow = require('./model/flows')


const clients = {};

function findChildrenByData(text, array) {
    for (let obj of array) {
        if (obj.data.toLowerCase() === text) {
            return formatChildren(obj.children);
        }
        let result = findChildrenByData(text, obj.children);
        if (result) {
            return result;
        }
    }
    return null;
}

function formatChildren(children) {
    if (children.length === 0) return "No children";
    if (children.length === 1) return children[0].data;

    let formattedString = "";
    children.forEach((child, index) => {
        formattedString += `${index + 1}. ${child.data}\n`;
    });
    return formattedString.trim();
}


async function startClient(id, ws, mobile) {
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
                ws.send('qr:' + qr)
            });

            clients[id].on('ready', () => {
                console.log(clients[id].info)
                console.log(`Whatsapp Client ${id} is ready!`)
                ws.send(`Whatsapp Client ${id} is ready!`);
            });

            clients[id].on('message_create', async (message) => {
                const flow = (await Flow.findOne({ userId: id }))
                // console.log(flow)
                if (message.from === `${mobile}@c.us` && flow.data) {
                    console.log(message.body?.toLowerCase())
                    const reply = findChildrenByData(message.body?.toLowerCase(), flow.data)
                    clients[id].sendMessage(message.from, reply)
                }

            })

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