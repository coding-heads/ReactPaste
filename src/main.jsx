import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./header";
import View from "./View";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./Editor";
import "https://kit.fontawesome.com/b047d2d425.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/view/:id" element={<View />} />
    </Routes>
  </BrowserRouter>
);
