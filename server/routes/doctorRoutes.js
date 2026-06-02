const express = require("express");
const router = express.Router();

const { createDoctor } = require("../controllers/doctorController")

router.post("/", createDoctor);
router.post("/create", createDoctor);
const Doctor = require("../models/Doctor")

// get , post , put/patch , delete

router.post("/add-doctor", createDoctor);

module.exports = router;