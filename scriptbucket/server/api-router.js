import express from "express";
const apiRouter = express.Router();
import db from "./database/db.js";
import jwt from "jsonwebtoken";

import {
  emailvalidator,
  passwordvalidator,
  generateAccessToken,
} from "./database/utils.js";

async function authMiddle(req, res, next) {
  const authHeader = req?.cookies?.authorized || null;
  const token = authHeader;
  if (token == null) return res.json("unauth");
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    let user = await db.getIDFromUsername(id);
    req.userID = user;
  } catch {
    return res.json("unauth");
  }
  next();
}

apiRouter.get("/user/auth", async (req, res) => {
  const authHeader = req?.cookies?.authorized || null;
  const token = authHeader;
  if (token == null) return res.json("false");
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    res.json({ id: id });
  } catch (err) {
    res.json("false");
  }
});
apiRouter.post("/user/login", async (req, res) => {
  if (req?.body?.email && req?.body?.password) {
    if (!emailvalidator(req.body.email)) return res.json("Invalid Credentials");
    if (!passwordvalidator(req.body.password))
      return res.json("Invalid Credentials");
    let user = await db.checkLogin(req.body.email, req.body.password);
    if (!user) return res.json("Invalid Credentials");
    return res.json({ token: generateAccessToken(user.username) });
  } else {
    res.json("credentials not provided");
  }
});
apiRouter.get("/user", (req, res) => {});
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
apiRouter.post("/comment/:a", authMiddle, async (req, res) => {
  let row = req.body;
  row = await db.insertComment(
    row.content,
    row.paste_id,
    req.userID,
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
