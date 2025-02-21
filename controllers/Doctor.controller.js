const Doctor = require("../models/Doctor.model.js");

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialty } = req.body;
    if(!name || !specialty){
      return res.status(400).json({message: "Name and Specialty are required"})
    }
    const doctor = await Doctor.create({
      name,
      specialty,
      createdBy: req.user.id, 
    });
    res.status(201).json({
      success: true,
      doctor,
      message: "Doctor Created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating Doctor" });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { createdBy: req.user.id },
    });
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ error: "Error getting Doctors" });
  }
};

exports.getDoctorById = async (req, res) => {
  try {

     if (isNaN(req.params.id)) {
       return res.status(400).json({ message: "Invalid Doctor ID" });
     }
    const doctor = await Doctor.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });
    if (!doctor) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update this doctor",
      });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
     if (isNaN(req.params.id)) {
       return res.status(400).json({ message: "Invalid Doctor ID" });
     }
    const { name, specialty } = req.body;
    const doctor = await Doctor.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });
     if (!doctor) {
       return res
         .status(403)
         .json({
           message:
             "Forbidden: You do not have permission to update this doctor",
         });
     }
    
    doctor.name = name || doctor.name;
    doctor.specialty = specialty || doctor.specialty;
    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteDoctor = async (req, res) => {
  try {
     if (isNaN(req.params.id)) {
       return res.status(400).json({ message: "Invalid Doctor ID" });
     }
    const doctor = await Doctor.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });
     if (!doctor) {
       return res.status(403).json({
         message: "Forbidden: You do not have permission to update this doctor",
       });
     }
    await doctor.destroy();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
