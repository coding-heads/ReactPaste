import { useState, useEffect, useRef } from "react";
import React from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import useCollapse from "react-collapsed";
import Comment from "./Comment";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
var Range = ace.require("ace/range").Range;

function View() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    duration: 1000,
    easing: "ease",
  });

  const params = useParams();
  const [value, setValue] = useState(0);
  const [filename, setFilename] = useState("");
  const [fileContent, setFileContent] = useState(undefined);
  const [pastes, setPastes] = useState([]);
  const [comments, setComments] = useState([]);
  const bin = useRef("");
  const commentContainer = useRef("");
  const [commentBinState, setCommentBinState] = useState(0);
  useEffect(() => {
    setTimeout(() => (document.querySelector(".App").style.opacity = 1), 100);
    async function loadFileContent(amt) {
      let content = await getPasteById(amt);
      setFileContent(content);
    }
    if (!fileContent) {
      loadFileContent(params.id);
    }
  }, []);
  function clearHighlights() {
    const prevMarkers = editorRef.current.editor.session.getMarkers();
    if (prevMarkers) {
      const prevMarkersArr = Object.keys(prevMarkers);
      for (let item of prevMarkersArr) {
        editorRef.current.editor.session.removeMarker(prevMarkers[item].id);
      }
    }
  }
  function highlight(start, end, color) {
    clearHighlights();
    editorRef.current.editor.setOption(
      editorRef.current.editor.$options.animatedScroll.name,
      true
    );
    editorRef.current.editor.renderer.STEPS = 25;
    editorRef.current.editor.scrollToLine(end, true, true, function() {});
    editorRef.current.editor.renderer.STEPS = 8;
    editorRef.current.editor
      .getSession()
      .addMarker(
        new Range(start, 0, end, 0),
        "userColor" + color,
        "information"
      );

    editorRef.current.editor.addSelectionMarker(
      new Range(start, 0, end, 0),
      "warning-marker",
      "fullLine"
    );
  }

  useEffect(() => {}, []);
  async function updateComments() {
    let commentOb = await fetch("/api/v1/comment/" + params.id);
    commentOb = await commentOb.json();
    setComments([]);
    for (let i of commentOb.comments) {
      i.selection_end++;
      setComments((comments) => [
        comments,
        ...[
          <div
            className="commentDivOuter"
            onMouseOver={() =>
              highlight(i.selection_start, i.selection_end, i?.user?.color)
            }
            onMouseLeave={() => clearHighlights()}
          >
            <Comment
              content={i.text}
              username={i?.user?.username}
              id={i?.user?.id}
            ></Comment>
          </div>,
        ],
      ]);
    }
  }
  async function openCloseBin() {
    if (!commentBinState) {
      updateComments();
      bin.current.style.width = "28vw";
    } else {
      clearHighlights();
      bin.current.style.width = "20px";
    }
    setCommentBinState(!commentBinState);
  }
  async function getPasteById(id) {
    let res = await fetch("/api/v1/paste/" + id, {
      method: "GET",
    });
    res = await res.json();
    return res.content.content;
  }
  const editorRef = useRef(null);

  function savePost() {
    const editorVal = editorRef.current.editor.getValue();
    fetch("/api/v1/paste/a", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        content: editorVal,
        private: value,
        filename: filename || null,
      }),
    });
  }
  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(() => (document.querySelector(".App").style.opacity = 1), 100);
  });

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      const range = editorRef.current.editor.selection.getAllRanges();
      const start_r = range[0].start.row;
      const end_r = range[0].end.row;
      let res = await fetch("/api/v1/comment/a", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          content: e.target.value,
          paste_id: params.id,
          s_start: start_r,
          s_end: end_r,
        }),
      });
      //nav(0);
      console.log(e.target);
      e.target.value = "";
      updateComments();
    }
  }
  return (
    <div className="App">
      <div className="editorControls"></div>

      <div className="editorBin view">
        <div className="CommentBin" ref={bin}>
          <div className="BinController" onClick={openCloseBin}>
            :
          </div>
          <div className="BinContent" ref={commentContainer}>
            <div className="commentsDiv">{comments}</div>
            <div className="submitCommentDiv">
              <textarea onKeyDown={handleKeyDown}></textarea>
            </div>
          </div>
        </div>

        <AceEditor
          ref={editorRef}
          mode="javascript"
          theme="one_dark"
          name="UNI"
          fontSize={19}
          showPrintMargin={false}
          value={fileContent}
          readOnly={true}
          editorProps={{ $ShowPrintMargin: false }}
        />
      </div>
    </div>
  );
}

export default View;
