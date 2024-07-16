import React, { useState } from "react";
import QRCode from "react-qr-code";
import { decodeToken } from "react-jwt";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [message, setMessage] = useState(null)
  const [mobile, setMobile] = useState('')
  function connect() {
    const token = localStorage.getItem('jwt_token')
    const decoded = decodeToken(token)
    const id = decoded._id
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
    const res = fetch(`http://localhost:3002/whatsapp/${id}/start/${mobile}`)
  }

  return (
    <>
      {message && <p>{message}</p>}
      {qrCode && <QRCode value={qrCode} />}
      <input type="tel" className="border-black border-2" placeholder="Number to Activate chatbot" value={mobile} onChange={e=>setMobile(e.target.value)}/>
      <button onClick={connect}>connect</button>
    </>
  );
};

export default Home;
