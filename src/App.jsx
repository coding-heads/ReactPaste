import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import CodeBlock from "./codeBlock";
import Slider from "react-slick";

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const [pastes, setPastes] = useState([]);
  useEffect(() => {
    setTimeout(() => (document.querySelector(".App").style.opacity = 1), 100);
    async function buildCodeBlocks(amt) {
      let res = [];

      let content = await getRecentPastes();
      setPastes((pastes) => [...content.pastes]);
    }
    if (pastes.length == 0) {
      buildCodeBlocks(15);
    }
  }, []);
  async function getRecentPastes() {
    let res = await fetch("/api/v1/paste/recent", {
      method: "GET",
    });
    res = await res.json();
    return res;
  }

  return (
    <div className="App">
      <div className="editorControls"></div>
      {/* <div className="carContainer">
        {pastes.map((ob, i) => (
          <>
            {" "}
            <CodeBlock
              value={ob.content.content}
              key={i}
              id={ob.id}
            ></CodeBlock>
          </>
        ))}
      </div> */}
      <div className="carContainer">
        <Slider {...settings}>
          {pastes.map((ob, i) => (
            <>
              {" "}
              <CodeBlock
                data-lazy="A"
                value={ob.content}
                key={i}
                id={ob.id}
              ></CodeBlock>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;
