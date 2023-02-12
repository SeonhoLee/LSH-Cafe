var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8001 });
CLIENTS = [];
tables = [];
userID = [];

wss.on("connection", function (ws) {
  // CLIENTS.push(ws);

  ws.on("message", function (message) {
    console.log("received: %s", message);
    var jsonData = JSON.parse(message);
    var test = "";
    //1

    if (jsonData[0].req == "con") {
      ws.id = jsonData[0].id;
      CLIENTS.push(ws);
      ws.send(JSON.stringify(tables));
      ///////test
      userInfo = {};
      test = ws.id;
      userInfo["id"] = ws.id;
      userInfo["req"] = "currentUser";
      userID.push(userInfo);
      //ws.send(JSON.stringify(userID));
      //ws.send(JSON.stringify(userID));
      // console.log(ws.id + "님이 접속 하셨습니다.");
      // console.log(CLIENTS[0].id);
      ////////test
      sendAllExceptMe(message, ws);
    } else if (jsonData[0].req == "res") {
      tableInfo = {};
      tableInfo["tnum"] = jsonData[0].tnum;
      tableInfo["id"] = jsonData[0].id;
      tableInfo["req"] = jsonData[0].req;
      tables.push(tableInfo);
      sendAll(message);
    } else if (jsonData[0].req == "use") {
      tableInfo = {};
      tableInfo["tnum"] = jsonData[0].tnum;
      tableInfo["id"] = jsonData[0].id;
      tableInfo["req"] = jsonData[0].req;
      tables.push(tableInfo);
      sendAll(message);
    } else if (jsonData[0].req == "resCan" || jsonData[0].req == "useCan") {
      for (var i = 0; i < tables.length; i++) {
        if (tables[i].tnum == jsonData[0].tnum) {
          tables.splice(i, 1);
          break;
        }
      }
      sendAll(message);
    } else if (jsonData[0].req == "sendmsg") {
      //메세지 보내기
      sendAll(message);
    } else if (jsonData[0].req == "sendID") {
      //id보내기
      sendAll(message);
    } else {
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
    for (var i = 0; i < userID.length; i++) {
      if (userID[i].id == ws.id) {
        userID.splice(i, 1);
        tempUser = {};
        tempArry = [];
        tempUser["id"] = ws.id;
        tempUser["req"] = "close";
        tempArry.push(tempUser);
        sendAll(JSON.stringify(tempArry));
      }
    }
  });
  //ws.send("NEW USER JOINED");
});

function sendAll(message) {
  for (var i = 0; i < CLIENTS.length; i++) {
    console.log(CLIENTS[i].id);
    CLIENTS[i].send("" + message);
  }
}

function sendAllExceptMe(message, ws) {
  for (var i = 0; i < CLIENTS.length; i++) {
    if (CLIENTS[i] != ws) {
      console.log("클라이언트: " + CLIENTS[i].id); // userName
      CLIENTS[i].send("" + message);
    }
  }
}

function send(message, id) {
  for (var i = 0; i < CLIENTS.length; i++) {
    if (CLIENTS[i].id == id) {
      CLIENTS[i].send("" + message);
      break;
    }
  }
}
