import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "./LoginRegister.css";
import CodeBlock from "./codeBlock";
import Slider from "react-slick";
import { Navigate } from "react-router-dom";

function Login() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const [pastes, setPastes] = useState([]);
  const [finish, setFinish] = useState("");
  useEffect(() => {
    setTimeout(() => (document.querySelector(".App").style.opacity = 1), 100);
  }, []);
  async function getRecentPastes() {
    let res = await fetch("/api/v1/paste/recent", {
      method: "GET",
    });
    res = await res.json();
    return res;
  }
  async function submitLogin() {
    let [email, password] = [...document.querySelectorAll("input")];
    let res = await fetch("/api/v1/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    res = await res.json();
    console.log(res);
    if (res?.token) {
      document.cookie = `authorized=${res.token}`;
      setFinish(1);
    }
  }
  function checkEnter(e) {
    if (e.key === "Enter") {
      submitLogin();
    }
  }

  return (
    <div className="App">
      <div className="editorControls"></div>
      <div className="LoginRegisterParent">
        <div className="loginregisterPicker"></div>
        <div className="Login">
          <span>
            <span>E</span>MAIL
          </span>
          <input spellCheck="false"></input>
          <span>
            <span>P</span>ASSWORD
          </span>
          <input type="password" onKeyUp={checkEnter}></input>
          <button onClick={submitLogin}>LOGIN</button>
        </div>
        <span className="register">Register</span>
        {finish && <Navigate to="/editor" />}
      </div>
    </div>
  );
}

export default Login;
