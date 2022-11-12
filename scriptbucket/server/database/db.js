import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, Op, DataTypes } from "sequelize";
import config from "../../config/database.js";
import models from "../../db/models/index.js";

const Paste = models.Paste;
const User = models.User;
const Comment = models.Comment;
import {
  emailvalidator,
  passwordvalidator,
  usernamevalidator,
} from "./utils.js";
const db2 = new Sequelize(config.development);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function getPaste(id) {
  let paste = await Paste.findOne({ where: { id: id } });
  return paste
    ? { result: { content: paste.content }, id: id }
    : { result: { content: "404 not found" }, id: id };
}
//Selects 6 random pastes to display on the front-page
async function getRecentPastes() {
  let pastes = await Paste.findAll({
    attributes: ["content", "id"],
    order: Sequelize.literal("random()"),
    limit: 6,
  });
  pastes = pastes.map((p) => p.dataValues);
  return pastes;
}
async function getCommentsOnPaste(id) {
  let comments = await Comment.findAll({
    where: { paste_id: id },
    attributes: ["text", "selection_end", "selection_start"],
  });

  comments = comments.map((c) => c.dataValues);

  return comments;
}
//returns the row of the created paste
async function insertPaste(content, userid = 1, priv = 0) {
  let newPaste = await Paste.create({
    content: content,
    user_id: userid,
    private: priv,
  });

  return newPaste ? { lastID: newPaste.id } : undefined;
}

async function insertComment(content, p_id, u_id = 1, s_start, s_end) {
  let newComment = Comment.create({
    text: content,
    paste_id: p_id,
    user_id: u_id,
    selection_start: s_start,
    selection_end: s_end,
  });

  return newComment ? { lastID: newComment.id } : undefined;
}
async function getRows(sql) {
  let db = await openDB();
  let rows = await db.all(sql);
  db.close();
  return rows;
}

async function makeUser(username, password, email) {
  if (!emailvalidator(email)) {
    return new Error("Email Invalid");
  }
  if (!usernamevalidator(username)) {
    return new Error(
      "Username must be 6-16 characters and can only include Letters and Numbers"
    );
  }
  if (!passwordvalidator(password)) {
    return new Error(
      "Password must be 6-32 characters and must include at least 1 number and 1 special character"
    );
  }

  let salt = crypto.randomBytes(16).toString("hex");

  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  const user = await User.create({
    username: username,
    password: hash,
    salt: salt,
    email: email,
  });
  return user;
}
async function checkLogin(email, password) {
  if (!emailvalidator(email)) return false;
  if (!passwordvalidator(password)) return false;
  let user = await User.findOne({ where: { email: email } });
  if (user?.validPassword(password)) {
    return user;
  } else {
    return false;
  }
}
const db = {
  getPaste,
  insertPaste,
  insertComment,
  getCommentsOnPaste,
  getRecentPastes,
};
export default db;
