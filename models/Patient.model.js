const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");

const Patient = sequelize.define("Patient", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
});


module.exports = Patient;
