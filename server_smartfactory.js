var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8001 });
CLIENTS = [];
updown = [];
fireDetector = [];
wss.on("connection", function (ws) {
  //CLIENTS.push(ws);

  ws.on("message", function (message) {
    console.log("received: %s", message);
    var jsonData = JSON.parse(message);
    console.log("json=" + jsonData[0].req);

    if (jsonData[0].req == "con") {
      CLIENTS.push(ws);
      console.log(updown);
      ws.send(JSON.stringify(updown));
      ws.send(JSON.stringify(fireDetector));
    } else if (jsonData[0].req == "up") {
      console.log("send: " + message);
      updownInfo = {};
      updownInfo["req"] = jsonData[0].req;
      updownInfo["upCnt"] = jsonData[0].upCnt;
      updown.push(updownInfo);
      sendAll(message);
    } else if (jsonData[0].req == "down") {
      console.log("send: " + message);
      updownInfo = {};
      updownInfo["req"] = jsonData[0].req;
      updownInfo["downCnt"] = jsonData[0].downCnt;
      updown.push(updownInfo);
      sendAll(message);
    } else if (jsonData[0].req == "passengerClose") {
      console.log("send: " + message);
      updownInfo = {};
      updownInfo["req"] = jsonData[0].req;
      updown.push(updownInfo);
      sendAll(message);
      updown = [];
    } else if (jsonData[0].req == "onFire") {
      console.log("send: " + message);
      fireDetectorInfo = {};
      fireDetectorInfo["req"] = jsonData[0].req;
      fireDetectorInfo["contents"] = jsonData[0].contents;
      fireDetector.push(fireDetectorInfo);
      sendAll(message);
    } else if (jsonData[0].req == "onSmoke") {
      console.log("send: " + message);
      fireDetectorInfo = {};
      fireDetectorInfo["req"] = jsonData[0].req;
      fireDetectorInfo["contents"] = jsonData[0].contents;
      fireDetector.push(fireDetectorInfo);
      sendAll(message);
    } else if (jsonData[0].req == "offFire") {
      console.log("send: " + message);
      fireDetectorInfo = {};
      fireDetectorInfo["req"] = jsonData[0].req;
      fireDetectorInfo["contents"] = jsonData[0].contents;
      fireDetector.push(fireDetectorInfo);
      sendAll(message);
    }
  });

  ws.on("close", function (message) {
    console.log("close");
    for (var i = 0; i < CLIENTS.length; i++) {
      if (CLIENTS[i] == ws) {
        CLIENTS.splice(i, 1);
      }
    }
  });
  //ws.send("NEW USER JOINED");
  ws.send(JSON.stringify("이선호등장"));
});

function sendAll(message) {
  for (var i = 0; i < CLIENTS.length; i++) {
    //console.log(CLIENTS[i].id);
    CLIENTS[i].send("" + message);
  }
}

function sendAllExceptMe(message, ws) {
  for (var i = 0; i < CLIENTS.length; i++) {
    if (CLIENTS[i] != ws) {
      //console.log("클라이언트 " + CLIENTS[i].id); // userName
      CLIENTS[i].send("" + message);
    }
  }
}
