import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import * as React from "react";
import Header from "./inc/Header";
import Main from "./inc/Main";
import Customer from "./inc/Customer";
import Manager from "./inc/Manager";
import MgrLogin from "./inc/MgrLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/manager" element={<Manager />}></Route>
          <Route path="/mgrLogin" element={<MgrLogin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
