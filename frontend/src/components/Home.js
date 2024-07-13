import React, { useState } from "react";
import QRCode from "react-qr-code";
// import { decodeToken } from "react-jwt";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [message, setMessage] = useState(null)
  function connect() {
    // const token = localStorage.getItem('jwt_token')
    // const decoded = decodeToken(token)
    // const id = decoded._id
    const id = localStorage.getItem('jwt_token')
    if (!isConnected) {
      const ws = new WebSocket(`ws://localhost:3003`)
      ws.onopen = function () {
        console.log('Connected to Server')
        setIsConnected(true)
      }

      ws.onclose = function () {
        console.log('Disconnected From Sercer')
        setIsConnected(false)
      }

      ws.onmessage = function (event) {
        const msg = event.data
        setMessage(msg)
        if (msg.slice(0, 3) === "qr:") {
          setQrCode(msg.slice(3))
        }
      }
    }
    const res = fetch(`http://localhost:3002/whatsapp/${id}/start`)
  }

  return (
    <>
      {message && <p>{message}</p>}
      {qrCode && <QRCode value={qrCode} />}
      <button onClick={connect}>connect</button>
    </>
  );
};

export default Home;
