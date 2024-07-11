import React, { useState } from 'react';

function Home() {
    const [isConnected, setIsConnected] = useState(false)
    function connect() {
        const id = document.getElementById('id').value
        if (!isConnected) {
            const ws = new WebSocket(`ws://localhost:3003/?id=${id}`)
            ws.onopen = function () {
                console.log('Connected to Server')
            }

            ws.onclose = function () {
                console.log('Disconnected From Sercer')
            }

            ws.onmessage = function (event) {
                console.log('From Server: ' + event.data)
            }
            setIsConnected(true)
        }
        const res = fetch(`http://localhost:3002/${id}/start`)
    }

    return (
        <>
            <input type='text' id="id"/>
            <button onClick={connect}>Connect</button>
        </>
    );
}

export default Home;