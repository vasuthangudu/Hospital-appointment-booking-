const crypto = require('crypto');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const createToken = (user, role) => {
  const secret = process.env.JWT_SECRET || 'hospital-secret';
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ id: user._id.toString(), email: user.email, role })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
};

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');
  return `${salt}:${hash}`;
};

const comparePassword = (password, storedValue) => {
  if (!storedValue || typeof storedValue !== 'string') {
    return false;
  }

  if (storedValue === password) {
    return true;
  }

  const [salt, hash] = storedValue.split(':');
  if (!salt || !hash) {
    return false;
  }

  const candidateHash = crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');
  return candidateHash === hash;
};

const registerPatient = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Full name, email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await Patient.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    const hashedPassword = hashPassword(password);
    const newUser = await Patient.create({ fullName, email: normalizedEmail, password: hashedPassword });

    const token = createToken(newUser, 'patient');
    return res.status(201).json({ success: true, token, user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: 'patient' } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await Patient.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = createToken(user, 'patient');
    return res.status(200).json({ success: true, token, user: { id: user._id, fullName: user.fullName, email: user.email, role: 'patient' } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const { fullName, email, password, speciality, experience } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Full name, email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await Doctor.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Doctor already exists.' });
    }

    const hashedPassword = hashPassword(password);
    const newDoctor = await Doctor.create({
      name: fullName,
      email: normalizedEmail,
      password: hashedPassword,
      speciality: speciality || 'General',
      experience: experience || 0,
      fee: 0,
      education: 'Pending',
      address: 'Pending',
      about: 'Pending',
    });

    const token = createToken(newDoctor, 'doctor');
    return res.status(201).json({ success: true, token, user: { id: newDoctor._id, fullName: newDoctor.name, email: newDoctor.email, role: 'doctor' } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await Doctor.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = createToken(user, 'doctor');
    return res.status(200).json({ success: true, token, user: { id: user._id, fullName: user.name, email: user.email, role: 'doctor' } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPatientRegistrations = async (req, res) => {
  try {
    const patients = await Patient.find({}, { password: 0 }).sort({ createdAt: -1 });

    const registrations = patients.map((patient) => ({
      id: patient._id,
      fullName: patient.fullName,
      email: patient.email,
      role: patient.role || 'patient',
      createdAt: patient.createdAt,
    }));

    return res.status(200).json({ success: true, count: registrations.length, registrations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAdminRegistrations = async (req, res) => {
  try {
    const [patients, doctors] = await Promise.all([
      Patient.find({}, { password: 0 }).sort({ createdAt: -1 }),
      Doctor.find({}, { password: 0 }).sort({ createdAt: -1 }),
    ]);

    return res.status(200).json({
      success: true,
      count: patients.length + doctors.length,
      registrations: {
        patients: patients.map((patient) => ({
          id: patient._id,
          fullName: patient.fullName,
          email: patient.email,
          role: patient.role || 'patient',
          createdAt: patient.createdAt,
        })),
        doctors: doctors.map((doctor) => ({
          id: doctor._id,
          fullName: doctor.name,
          email: doctor.email,
          role: 'doctor',
          speciality: doctor.speciality,
          experience: doctor.experience,
          createdAt: doctor.createdAt,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerPatient,
  loginPatient,
  registerDoctor,
  loginDoctor,
  getPatientRegistrations,
  getAdminRegistrations,
};
