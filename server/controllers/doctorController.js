const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({  
// NAME,EMAIL,PASSWORD,EXPRIENCE,FRRE,SPECIALITY,EDUCATION,ADDRESS,ABOUT
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    fee:{   
        type:Number,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    }
})

const Doctor = mongoose.model("Doctor", doctorSchema);

const createDoctor = async (req, res) => {
    try {
        const { name, email, password, experience, fee, speciality, education, address, about } = req.body;
        
        const newDoctor = new Doctor({
            name,
            email,
            password,
            experience,
            fee,
            speciality,
            education,
            address,
            about
        });
        
        const savedDoctor = await newDoctor.save();
        res.status(201).json({ success: true, data: savedDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createDoctor, Doctor };