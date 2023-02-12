function Header(props) {
  return (
    <>
      <h1>카페</h1>
      <div>
        <a href="/">메인</a> | <a href="/customer">손님</a> |{" "}
        <a href="/mgrLogin">관리자 로그인</a>
      </div>
      <hr />
    </>
  );
}

export default Header;
