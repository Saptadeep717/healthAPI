const {Patient,User,Doctor,Mapping} = require('../models/Relation.model.js');

exports.createMapping = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    const createdBy = req.user.id; 
    const doctor = await Doctor.findOne({ where: { id: doctorId, createdBy } });
    if (!doctor) {
      return res
        .status(403)
        .json({ message: "Unauthorized to map this doctor" });
    }
    const patient = await Patient.findOne({
      where: { id: patientId, createdBy },
    });
    if (!patient) {
      return res
        .status(403)
        .json({ message: "Unauthorized to map this patient" });
    }

    const mapping = await Mapping.create({ doctorId, patientId, createdBy });

    res.status(201).json({
      success: true,
      mapping,
      message: "Patient-Doctor Mapping Created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      where: { createdBy: req.user.id },
      include: [
        {
          model: Doctor,
          attributes: [ "id","name", "specialty"], 
        },
        {
          model: Patient,
          attributes: [ "id","name", "age"], 
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
     if (mappings.length === 0) {
       return res.status(403).json({
         success: false,
         message: "Unauthorized: You cannot access these mappings",
       });
     }
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDoctorsByPatientId = async (req, res) => {
  try {
    const { id: patientId } = req.params;
     const patient = await Patient.findOne({
       where: { id: patientId, createdBy: req.user.id },
     });

      if (!patient) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: You cannot access this patient",
        });
      }
    const mappings = await Mapping.findAll({
      where: { patientId: req.params.id, createdBy: req.user.id },
      include: [
        {
          model: Doctor,
          attributes: ["id", "name", "specialty"],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.removeDoctorFromPatient = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params; 
    const createdBy = req.user.id;
    const doctor = await Doctor.findOne({ where: { id: doctorId, createdBy } });
    if (!doctor) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this doctor" });
    }
    const patient = await Patient.findOne({
      where: { id: patientId, createdBy },
    });
    if (!patient) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this patient" });
    }

    const mapping = await Mapping.findOne({
      where: { patientId, doctorId, createdBy }, 
    });

    if (!mapping) {
      return res
        .status(404)
        .json({ message: "Doctor not found for this patient" });
    }

    await mapping.destroy(); 

    res
      .status(200)
      .json({ message: "Doctor removed from patient successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

