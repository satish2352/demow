const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Flow = require('./model/flows')

let listActive;
let lastList;
const clients = {};

// const findKeyValue = (objList, text) => {
//     for (const obj of objList) {
//         // Check if 'data' key exists and matches the text
//         if (obj.hasOwnProperty('data') && obj.data.toLowerCase() === text) {
//             return obj.children;  // Return the children of the matched object
//         }

//         // Check 'children' recursively if present
//         if (obj.hasOwnProperty('children') && obj.children.length > 0) {
//             let result = findKeyValue(obj.children, text);
//             if (result !== null) {
//                 return result;  // Return the children found in nested objects
//             }
//         }
//     }

//     // If not found in the current object or its children, return null
//     return null;
// };

// const generateListMessage = (reply) => {
//     return reply
//         .map((obj, index) => `${index + 1}. ${obj.data}`)
//         .join('\n');
// };

// const handleReply = async (message, text, data, id) => {
//     console.log("In handle reply")
//     let msg;

//     if (listActive && !isNaN(parseInt(text))) {
//         const num = parseInt(text)
//         listActive=false
//         handleReply(lastList[num].children)  
//     }


//     const reply = await findKeyValue(data, text)
//     if (reply && reply.length > 1) {
//         msg = generateListMessage(reply)
//         listActive = true
//         lastList = reply
//     } else if (reply && reply.length === 1) {
//         msg = reply[0].data
//     } else {
//         msg = "Data not found"
//     }
//     clients[id].sendMessage(message.from, msg)
//     // console.log(msg, listActive)
// };


async function startClient(id, ws) {
    const data = (await Flow.findOne({userId:id})).data
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
                ws.send('qr:' + qr)
            });

            clients[id].on('ready', () => {
                console.log(`Whatsapp Client ${id} is ready!`)
                ws.send(`Whatsapp Client ${id} is ready!`);
            });

            clients[id].on('message_create', async(message)=>{
                if(message.fromMe){
                    console.log(message.body)
                    // console.log(data)
                    // handleReply(message, message.body?.toLowerCase(), data, id)
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