const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
    createDoctor,
    getAllDoctors,
    singleDoctor,
    doctorOne,
    deleteDoctor
} = require("../controllers/doctorController");

// Create Doctor with image upload
router.post("/add-doctor", upload.single("image"), createDoctor);

// Get All Doctors
router.get("/all-doctors", getAllDoctors);

router.get("/single-doctor/:id", singleDoctor);

router.put("/update-doctor/:id", doctorOne);

router.delete("/delete-doctor/:id", deleteDoctor);

module.exports = router;