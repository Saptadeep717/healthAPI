const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");

const Doctor = sequelize.define("Doctor", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Doctor;
