import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../../../.env" });
export function generateAccessToken(username) {
  return jwt.sign({ id: username }, process.env.SECRET, { expiresIn: "1d" });
}
export function emailvalidator(input) {
  if (!(typeof input === "string")) return false;

  let mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return input.match(mailformat);
}
export function usernamevalidator(input) {
  if (!(typeof input === "string")) return false;
  let usernameFormat = /^[a-zA-Z0-9]{6,16}$/;
  return input.match(usernameFormat);
}
export function passwordvalidator(input) {
  if (!(typeof input === "string")) return false;
  let passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;
  return input.match(passwordFormat);
}
