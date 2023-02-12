var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8001 });
CLIENTS = [];
tables = [];
userID = [];

wss.on("connection", function (ws) {
  // CLIENTS.push(ws);
  ws.on("message", function (message) {
    console.log("received: %s", message);

    console.log(jsonData[0].req);
    sendAll(message);
  });
  ws.send("NEW USER JOINED");
});

function sendAll(message) {
  for (var i = 0; i < CLIENTS.length; i++) {
    console.log(CLIENTS[i].id);
    CLIENTS[i].send("" + message);
  }
}
