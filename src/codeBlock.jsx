import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
// import 'tippy.js/dist/tippy.css'; // optional
function CodeBlock(props) {
  const nav = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(() => (document.querySelector(".App").style.opacity = 1), 100);
  });
  function view(id) {
    window.history.pushState({}, null, "/view/" + id);
    nav(0);
  }

  return (
    <Tooltip
      html={
        <div class="toolTip">
          <i
            class="fa-solid fa-up-right-and-down-left-from-center"
            onClick={() => view(props.id)}
          ></i>
        </div>
      }
      interactive="true"
      position="top"
    >
      <div className="codeBlock">
        <AceEditor
          mode="javascript"
          theme="one_dark"
          name="codeBlock"
          fontSize={16}
          showPrintMargin={false}
          readOnly={true}
          highlightActiveLine={false}
          value={props.value}
          setOptions={{ readonly: true }}
        />
      </div>
    </Tooltip>
  );
}

export default CodeBlock;
