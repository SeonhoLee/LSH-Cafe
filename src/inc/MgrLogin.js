//비밀번호가 맞으면 관리자 화면으로 이동
function MgrLogin(props) {
  function mgrPage() {
    //비밀번호 1234로 지정
    if (document.getElementById("mgrPW").value === "1234") {
      document.getElementById("wrongPW").innerHTML =
        "관리자 페이지로 이동합니다.";
      //window 안붙이면 오류
      window.location.href = "/manager";
      return;
    } else {
      console.log("비밀번호가 틀렸습니다.");
      document.getElementById("wrongPW").innerHTML = "잘못된 비밀번호 입니다.";
      return;
    }
  }
  return (
    <>
      <div>
        <h3>관리자 로그인 페이지</h3>
        <input id="mgrPW" type="password" maxLength="10" />
        <input type="button" value="로그인" onClick={mgrPage} />
        <div id="wrongPW"></div>
      </div>
    </>
  );
}

export default MgrLogin;
