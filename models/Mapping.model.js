const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Mapping = sequelize.define("Mapping", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  patientId: { type: DataTypes.INTEGER, allowNull:false },
  doctorId: { type: DataTypes.INTEGER, allowNull:false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
});


module.exports = Mapping;
