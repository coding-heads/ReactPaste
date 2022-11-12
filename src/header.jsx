import React from "react";
import { useState } from "react";

import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const nav = useNavigate();
  const [count, setCount] = useState(0);
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
        </div>
      </div>
    </div>
  );
}

export default Header;
