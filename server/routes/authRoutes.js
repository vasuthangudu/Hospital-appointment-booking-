const express = require('express');
const router = express.Router();
const {
  registerPatient,
  loginPatient,
  registerDoctor,
  loginDoctor,
  getPatientRegistrations,
  getAdminRegistrations,
} = require('../controllers/authController');

router.post('/patient/register', registerPatient);
router.post('/patient/login', loginPatient);
router.get('/patient/login', getPatientRegistrations);
router.post('/doctor/register', registerDoctor);
router.post('/doctor/login', loginDoctor);
router.get('/admin/login', getAdminRegistrations);

module.exports = router;
