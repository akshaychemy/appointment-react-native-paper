import Appointment from '../models/Appointment.js';


export const bookAppointment =async (req,res)=>{
    const {name,phoneNumber,clinic,selectedDoctor,date,timeSlot,selectedService}= req.body;
    try{
        const appointment = new Appointment({name,phoneNumber,clinic,selectedDoctor,date,timeSlot,selectedService});
        await appointment.save();
        res.status(201).json({message:'created appointment successfully',data:appointment});

    }catch(err){
        res.status(500).json({message:err.message})
    }
}



export const getAppointments =async (req,res)=>{
    try{
        const appointments = await Appointment.find().populate('clinic','name image description').populate('selectedDoctor')
        res.status(200).json(appointments);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}