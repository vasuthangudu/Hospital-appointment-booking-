const { json } = require("body-parser");
const Doctor = require("../models/Doctor");
const fs = require("fs");
const path = require("path");

const createDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            experience,
            fee,
            speciality,
            education,
            address,
            about
        } = req.body;

        // Handle image file if uploaded
        let imageFileName = null;
        let imagePath = null;

        if (req.file) {
            imageFileName = req.file.filename;
            imagePath = `/uploads/doctors/${req.file.filename}`;
        }

        const newDoctor = new Doctor({
            name,
            email,
            password,
            experience,
            fee,
            speciality,
            education,
            address,
            about,
            image: imagePath,
            imageFileName: imageFileName
        });

        const savedDoctor = await newDoctor.save();

        res.status(201).json({
            success: true,
            data: savedDoctor,
            message: "Doctor added successfully with image"
        });
    }
    
    catch (error) {
        // Delete uploaded file if doctor creation fails
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};






const singleDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });

    } catch (error) {
        console.error("This is an error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};




//update doctor 

const doctorOne = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            experience,
            fee,
            speciality,
            education,
            address,
            about
        } = req.body;

        const myDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                password,
                experience,
                fee,
                speciality,
                education,
                address,
                about
            },
            {
                new: true // return updated document
            }
        );
 
        if (!myDoctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            data: myDoctor
        });

    } catch (error) {
        console.error("This is an error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};





const deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!deletedDoctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully"
        });

    } catch (error) {
        console.error("This is an error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    createDoctor,
    getAllDoctors,
    singleDoctor,
    doctorOne,
    deleteDoctor
};