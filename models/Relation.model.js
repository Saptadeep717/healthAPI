const { sequelize } = require("../config/database.js");
const User = require("./User.model.js");
const Doctor = require("./Doctor.model.js");
const Patient = require("./Patient.model.js");
const Mapping = require("./Mapping.model.js");

User.hasMany(Patient, { foreignKey: "createdBy" });
User.hasMany(Doctor, { foreignKey: "createdBy" });

Patient.belongsTo(User, { foreignKey: "createdBy" });
Doctor.belongsTo(User, { foreignKey: "createdBy" });

Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: "patientId" });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: "doctorId" });

Mapping.belongsTo(Patient, { foreignKey: "patientId" });
Mapping.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = { sequelize, User, Doctor, Patient, Mapping };
