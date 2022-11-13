import React, { useEffect } from "react";
import { useState } from "react";

import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const nav = useNavigate();
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(-1);
  const [userName, setUserName] = useState("");
  function pathTransition(e, path) {
    e.preventDefault();
    console.log(window.location.pathname);
    if (window.location.pathname != path) {
      console.log((document.querySelector(".App").style.opacity = 0));
      setTimeout(() => {
        window.history.pushState({}, null, path);
        nav(0);
      }, 100);
    }
  }
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }
  useEffect(() => {
    async function checkAuth() {
      if (getCookie("authorized")) {
        let res = await fetch("/api/v1/user/auth", {
          method: "GET",
          credentials: "include",
        });
        res = await res.json();
        if (res.id) {
          setLoggedIn(true);
          setUserName(res.id);
        } else {
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    }
    checkAuth();
  });
  return (
    <div className="Header">
      <div className="HeaderContent">
        <div className="Title">
          <i>S</i>cript<i>B</i>ucket
        </div>

        <div className="navLinks">
          <Link to="/app" onClick={(e) => pathTransition(e, "/")}>
            Home
          </Link>{" "}
          <Link to="/expenses" onClick={(e) => pathTransition(e, "/editor")}>
            Editor
          </Link>
          <Link to="/login" onClick={(e) => pathTransition(e, "/login")}>
            <span className="loginRegister">
              {!loggedIn && "Login / Register"}
              {loggedIn && userName}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
