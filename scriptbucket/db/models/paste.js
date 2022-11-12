"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paste.init(
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      private: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Paste",
    }
  );
  return Paste;
};
