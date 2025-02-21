const Patient = require('../models/Patient.model.js');

exports.createPatient = async (req, res) => {
  try {
    const { name, age } = req.body;
    if(!name || !age){
      return res.status(400).json({message: "Name and Age are required"})
    }
    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
      return res
        .status(400)
        .json({ message: "Age must be a positive integer" });
    }
    const patient = await Patient.create({
      name,
      age:parsedAge,
      createdBy: req.user.id, 
    });
    res.status(201).json({
      success: true,
      patient,
      message: "Patient Created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating patient" });
  }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({ where: { createdBy: req.user.id }});
        res.status(200).json({ success: true, patients });
    } catch (error) {
        res.status(500).json({ error: "Error getting patients" });
    }
}


exports.getPatientById = async (req, res) => {

   if (isNaN(req.params.id)) {
     return res.status(400).json({ message: "Invalid Patient ID" });
   }
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });
    if (!patient) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update this patient",
      });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updatePatient = async (req, res) => {
   if (isNaN(req.params.id)) {
     return res.status(400).json({ message: "Invalid Patient ID" });
   }
  try {
    const { name, age } = req.body;
    const patient = await Patient.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });
    if (!patient) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update this patient",
      });
    }
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    await patient.save();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePatient = async (req, res) => {
   if (isNaN(req.params.id)) {
     return res.status(400).json({ message: "Invalid Patient ID" });
   }
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });
   if (!patient) {
     return res.status(403).json({
       message: "Forbidden: You do not have permission to update this patient",
     });
   }
    await patient.destroy();
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};