import React from "react";
import "./App.css";
import "./Comment.css";
function Comment(props) {
  return (
    <div className="commentDiv">
      <span className="commentDivUsername">{props.username}</span>
      <span className="commentDivContent">{props.content}</span>
    </div>
  );
}

export default Comment;
