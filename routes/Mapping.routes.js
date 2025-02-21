const express = require("express");
const router = express.Router();
const {
  createMapping,
  getMappings,
  getDoctorsByPatientId,
  removeDoctorFromPatient,
} = require("../controllers/Mapping.controller.js");
const { signup, login } = require("../controllers/Auth.controller.js");
const { protect } = require("../utils/Auth.middleware.js");
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/Doctor.controller.js");
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/Patient.controller.js");

router.post("/register", signup);
router.post("/login", login);
router
  .route("/doctors")
  .get(protect, getAllDoctors)
  .post(protect, createDoctor);

router
  .route("/doctors/:id")
  .get(protect, getDoctorById)
  .put(protect, updateDoctor)
  .delete(protect, deleteDoctor);

router
  .route("/patients")
  .get(protect, getAllPatients)
  .post(protect, createPatient)

router.route('/patients/:id')  
  .get(protect, getPatientById)
  .put(protect, updatePatient)
  .delete(protect, deletePatient);

router
  .route("/mappings")
  .post(protect, createMapping)
  .get(protect, getMappings)
  

router.get('/mappings/patient/:id',protect, getDoctorsByPatientId)
router.delete('/mappings/patient/:patientId/doctor/:doctorId',protect, removeDoctorFromPatient);

module.exports = router;
