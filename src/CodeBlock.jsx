import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Link} from 'react-router-dom';
import AceEditor from "react-ace";
import "https://kit.fontawesome.com/b047d2d425.js";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import Switch from 'react-input-switch';
function Editor() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(()=>document.querySelector(".App").style.opacity = 1,100);
  });

  const style2 = value?{opacity:1}:{opacity:0};

  const style1 = value?{opacity:0}:{opacity:1};

  return (
    <div className="App">
      <div className="editorControls">
        <div className='leftSide'>
          <i class="fa-solid fa-angle-right"></i>
          <input placeholder={"filename"}></input>
          <span style={style1}>Public </span>
          <Switch
          styles={{
            track: {
              backgroundColor: 'gray'
            },
            trackChecked: {
              backgroundColor: 'hotpink'
            },
            button: {
              backgroundColor: 'white'
            },
            buttonChecked: {
              backgroundColor: 'white'
            }
          }} value={value} onChange={setValue} />

          <span style={style2}> Private</span>
        </div>
        <div className='rightSide'>
          <i class="fa-solid fa-trash"></i>
          <i class="fa-solid fa-floppy-disk"></i>
        </div>
        </div>
      <div className="editorBin">
      <AceEditor
    mode="javascript"
    theme="one_dark"
    name="UNI"
    fontSize={19}
    showPrintMargin={false}
    editorProps={{$ShowPrintMargin:false }}
  />
</div>

    </div>
  )
}

export default Editor
