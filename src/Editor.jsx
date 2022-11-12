import { useState, useEffect, useRef } from "react";
import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import Switch from "react-input-switch";

function Editor() {
  const nav = useNavigate();
  const [value, setValue] = useState(0);
  const [filename, setFilename] = useState("");
  const editorRef = useRef(null);

  async function savePost() {
    const editorVal = editorRef.current.editor.getValue();
    let res = await fetch("/api/v1/paste/a", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        content: editorVal,
        private: value,
        filename: filename || null,
      }),
    });
    res = await res.json();
    window.history.pushState({}, null, "/view/" + res.id);
    nav(0);
  }
  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(() => (document.querySelector(".App").style.opacity = 1), 100);
  });

  const style2 = value ? { opacity: 1 } : { opacity: 0 };

  const style1 = value ? { opacity: 0 } : { opacity: 1 };

  return (
    <div className="App">
      <div className="editorControls">
        <div className="leftSide">
          <i class="fa-solid fa-angle-right"></i>
          <input
            placeholder={"filename"}
            onChange={(e) => setFilename(e.target.value)}
          ></input>
          <span style={style1}>Public </span>
          <Switch
            styles={{
              track: {
                backgroundColor: "gray",
              },
              trackChecked: {
                backgroundColor: "hotpink",
              },
              button: {
                backgroundColor: "white",
              },
              buttonChecked: {
                backgroundColor: "white",
              },
            }}
            value={value}
            onChange={setValue}
          />

          <span style={style2}> Private</span>
        </div>
        <div className="rightSide">
          <i class="fa-solid fa-trash"></i>
          <i class="fa-solid fa-floppy-disk" onClick={savePost}></i>
        </div>
      </div>
      <div className="editorBin">
        <AceEditor
          ref={editorRef}
          mode="javascript"
          theme="one_dark"
          name="UNI"
          fontSize={19}
          showPrintMargin={false}
          editorProps={{ $ShowPrintMargin: false }}
        />
      </div>
    </div>
  );
}

export default Editor;
