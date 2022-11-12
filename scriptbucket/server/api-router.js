import express from "express";
const apiRouter = express.Router();

import db from "./database/db.js";
const demoPastes = ["Hello Demon", "also hell more text", "yes infinite text"];
apiRouter.get("/paste/recent", async (req, res) => {
  let pastes = await db.getRecentPastes();
  res.json({ pastes });
});
apiRouter.get("/paste/:id", async (req, res) => {
  let id = req.params.id;
  let paste = false;
  paste = await db.getPaste(id);
  res.json({ content: paste.result, id: paste.id });
});

apiRouter.post("/paste/:a", async (req, res) => {
  let row = req.body;
  row = await db.insertPaste(row.content);
  res.json({ id: row.lastID });
});
apiRouter.post("/comment/:a", async (req, res) => {
  let row = req.body;
  row = await db.insertComment(
    row.content,
    row.paste_id,
    row.user_id,
    row.s_start,
    row.s_end
  );
  res.json({ id: row.lastID } || "Failed");
});
apiRouter.get("/comment/:id", async (req, res) => {
  let id = req.params.id;
  let row = await db.getCommentsOnPaste(id);
  res.json({ comments: row || null });
});

export default apiRouter;
