const express = require('express');
const cors = require('cors');
const WebSocketServer = require('ws').Server
const { connectMongoDb, initializeUserRoles } = require('./connection.js')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const whatsapp = require('./routes/Whatsapp.js')
const user = require('./routes/Users.js')
const flow = require('./routes/Flows.js')


connectMongoDb()
initializeUserRoles()
  .then(() => {
    console.log('UserRoles collection initialization check complete.');
  })
  .catch((err) => {
    console.error('Error initializing UserRoles collection:', err);
    process.exit(1);
  });


app.use('/whatsapp', whatsapp)
app.use('/user', user)
app.use('/flow', flow)


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});