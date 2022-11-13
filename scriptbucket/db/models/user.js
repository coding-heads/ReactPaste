"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    generateSalt() {
      return crypto.randomBytes(16).toString("hex");
    }
    hashPassword(password, salt) {}
    validPassword(password) {
      let hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
      return this.password === hash;
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      salt: {
        type: DataTypes.STRING,
        defaultValue: crypto.randomBytes(16).toString("hex"),
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          function(value) {
            this.password = crypto
              .pbkdf2Sync(value, this.salt, 1000, 64, `sha512`)
              .toString(`hex`);
          },
        },
      },
    },

    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Comment, { foreignKey: "user_id", as: "comments" });
  };
  return User;
};
