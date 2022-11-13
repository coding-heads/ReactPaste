import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, Op, DataTypes } from "sequelize";
import config from "../../config/database.js";
import models from "../../db/models/index.js";
import crypto from "crypto";
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

  const user = await User.create({
    username: username,
    password: password,
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
(async () => {
  let a = await makeUser("brandbrand", "password1!", "brandonetter@gmail.com");
  console.log(a);
})();
