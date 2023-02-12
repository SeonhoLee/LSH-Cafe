import * as React from "react";

function Customer(props) {
  //소켓 지정

  //const webSocketUrl = "ws://localhost:8001";
  //const webSocketUrl = "ws://10.32.15.47:8080";
  const webSocketUrl = "ws://172.30.1.9:8001";
  let ws = React.useRef(null);
  ws.current = new WebSocket(webSocketUrl);

  //연결 또는 비연결 시 출력
  //useEffect >> on off 될 시 한번만 실행
  React.useEffect(() => {
    //연결
    ws.current.onopen = function (e) {
      var data = {};
      var sendData = [];
      data["id"] = "손님1";
      data["req"] = "con";
      sendData.push(data);
      var jsonData = JSON.stringify(sendData);
      ws.current.send(jsonData);
      //ws.current.send("손님 화면 연결되었습니다!!");
    };

    //메시지 받기
    ws.current.onmessage = function (e) {
      //ws.current.send(e.data);
      console.log(e.data);

      if (e.data === "1번테이블 ON") {
        document.getElementById("changeDiv1").style.backgroundColor = "black";
      } else if (e.data === "1번테이블 OFF") {
        document.getElementById("changeDiv1").style.backgroundColor = "white";
      } else if (e.data === "2번테이블 ON") {
        document.getElementById("changeDiv2").style.backgroundColor = "black";
      } else if (e.data === "2번테이블 OFF") {
        document.getElementById("changeDiv2").style.backgroundColor = "white";
      } else if (e.data === "3번테이블 ON") {
        document.getElementById("changeDiv3").style.backgroundColor = "black";
      } else if (e.data === "3번테이블 OFF") {
        document.getElementById("changeDiv3").style.backgroundColor = "white";
      } else if (e.data === "4번테이블 ON") {
        document.getElementById("changeDiv4").style.backgroundColor = "black";
      } else if (e.data === "4번테이블 OFF") {
        document.getElementById("changeDiv4").style.backgroundColor = "white";
      } else if (e.data === "5번테이블 ON") {
        document.getElementById("changeDiv5").style.backgroundColor = "black";
      } else if (e.data === "5번테이블 OFF") {
        document.getElementById("changeDiv5").style.backgroundColor = "white";
      } else if (e.data === "6번테이블 ON") {
        document.getElementById("changeDiv6").style.backgroundColor = "black";
      } else if (e.data === "6번테이블 OFF") {
        document.getElementById("changeDiv6").style.backgroundColor = "white";
      } else if (e.data === "7번테이블 ON") {
        document.getElementById("changeDiv7").style.backgroundColor = "black";
      } else if (e.data === "7번테이블 OFF") {
        document.getElementById("changeDiv7").style.backgroundColor = "white";
      } else if (e.data === "8번테이블 ON") {
        document.getElementById("changeDiv8").style.backgroundColor = "black";
      } else if (e.data === "8번테이블 OFF") {
        document.getElementById("changeDiv8").style.backgroundColor = "white";
      } else if (e.data === "9번테이블 ON") {
        document.getElementById("changeDiv9").style.backgroundColor = "black";
      } else if (e.data === "9번테이블 OFF") {
        document.getElementById("changeDiv9").style.backgroundColor = "white";
      }
      document.getElementById("messageText").innerHTML += e.data + "<br />";
    };

    //연결 종료
    ws.current.onclose = function (e) {
      if (e.wasClean) {
        alert(
          `[close] 커넥션이 정상적으로 종료되었습니다(code=${e.code} reason=${e.reason})`
        );
      } else {
        alert("[close] 커넥션이 죽었습니다.");
      }
    };

    //에러 발생시
    ws.current.onerror = function (e) {
      console.log(e);
    };
  }, []);

  //input 내용을 button으로 클릭해서 보냄

  function sendMS() {
    const sendMgr = document.getElementById("sendMgr");
    //ws.current.send("손님: " + sendMgr.value);
    var data = {};
    var sendData = [];
    data["id"] = "이선호";
    data["req"] = "sendmsg";
    data["content"] = sendMgr.value;
    sendData.push(data);
    var jsonData = JSON.stringify(sendData);
    ws.current.send(jsonData);
    //ws.current.send(sendMgr.value);

    return;
  }

  return (
    <>
      <div>
        <h4>매니저에게 메시지 보내기</h4>
        <input type="text" id="sendMgr" />
        <button onClick={sendMS}> 보내기 </button>
        <div id="messageText"></div>
      </div>

      <hr />
      <h4>손님 화면</h4>
      <div>
        <div className="container">
          <div className="divItem2" id="changeDiv1">
            1번 테이블
          </div>
          <div className="divItem2" id="changeDiv2">
            2번 테이블
          </div>
          <div className="divItem2" id="changeDiv3">
            3번 테이블
          </div>
          <div className="divItem2" id="changeDiv4">
            4번 테이블
          </div>
          <div className="divItem2" id="changeDiv5">
            5번 테이블
          </div>
          <div className="divItem2" id="changeDiv6">
            6번 테이블
          </div>
          <div className="divItem2" id="changeDiv7">
            7번 테이블
          </div>
          <div className="divItem2" id="changeDiv8">
            8번 테이블
          </div>
          <div className="divItem2" id="changeDiv9">
            9번 테이블
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
