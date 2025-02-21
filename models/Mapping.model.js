const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Patient = require("./Patient.model.js");
const Doctor = require("./Doctor.model.js");
const Mapping = sequelize.define("Mapping", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  patientId: { type: DataTypes.INTEGER, allowNull:false },
  doctorId: { type: DataTypes.INTEGER, allowNull:false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
});

Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: "patientId" });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: "doctorId" });

Mapping.belongsTo(Patient, { foreignKey: "patientId" });
Mapping.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = Mapping;
