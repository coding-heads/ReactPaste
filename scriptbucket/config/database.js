const dotenv = require("dotenv").config({ path: __dirname + "/../../.env" });
console.log(dotenv);
module.exports = {
  development: {
    storage: process.env.DB,
    dialect: "sqlite",
  },
};
