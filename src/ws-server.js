const proxyWsUrl = "wss://gas-price-api-staging.1inch.io/ws";
// TODO: socket.io - https://docs.cypress.io/guides/references/trade-offs#Multiple-browsers-open-at-the-same-time
const WebSocket = require('ws');
const express = require( "express");
const app = express();
const expressWs = require('express-ws')(app);
const clientList = expressWs.getWss().clients;

const wsProxy = new WebSocket(proxyWsUrl);

let server;
let mediator;

app.get("/test", (req, res) => {
    res.send('HI');
});

app.ws('/ws', (ws, req) => {
    console.log("New connection has opened!");
    ws.on('message', function(msg) {
        console.log(msg);
    });
    ws.on('close', function() {
        console.log('The connection was closed!');
    });
});

// proxy all messages from origin ws
wsProxy.onmessage = event => {
    if (server && clientList) {
        let incoming = event.data;

        if (mediator) {
            mediator(incoming, null);
        }

        // console.log('value to send: ', incoming.value);
        clientList.forEach(client => client.send(incoming));
    }
}

module.exports = {
    startServer: port => {
        if (!server) {
            console.log('start server on port', port);
            server = app.listen(port);
        }
        else console.log('server already started!');
    },
    stopServer: () => {
      if (server) {
          console.log("stop server");
          server.close();
      }
    },
    setMediator: newMediator => {
        mediator = newMediator;
    },
    unsetMediator: () => mediator = null
}
