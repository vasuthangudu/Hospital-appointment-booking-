const Employee = require("../models/Doctor")

const createDoctor = async (req, res) => {
    try {
        const{name,email,password,experience,fee,speciality,education,address,about} = req.body
     
         const doctor = new Employee({
            name,email,password,experience,fee,speciality,education,address,about
         })
         await doctor.save()
         res.status(201).json(doctor)
    }catch (error) {
        res.status(500).json({message: "Error creating doctor", error})
    }
}

exports.exports = {createDoctor}