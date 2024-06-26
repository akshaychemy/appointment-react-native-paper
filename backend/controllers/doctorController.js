import Doctor  from '../models/Doctor.js'
import upload from '../middleware/fileUpload.js'

import path from 'path';
import multer from 'multer';

export const getDoctors = async (req,res)=>{
    try{
        const doctors = await Doctor.find().populate('clinic')
        res.status(200).json(doctors)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}



export const createDoctor = async (req,res)=>{
    // console.log("==>",req)
    try{
        upload.single('image')(req,res,async(err)=>{
            if(err instanceof multer.MulterError){
                res.status(400).json({"message":'file upload error',error:err.message})
            }else if(err){
                res.status(500).json({"message":'internal server error',error:err.message})
            }
        

        const {name,clinic,service,description} = req.body

        if (!req.file) {
            return res.status(400).json({ "message": 'No file uploaded' });
        }

        const imagepath = req.file.path;
        console.log("==>")
        const filename = path.basename(imagepath)

        // const serviesArray = service.split(',').map((service)=>service.trim()).filter(service=>service)
        // console.log("==>",serviesArray)

        const doctor = new Doctor({name,clinic,image:filename,description})
        await doctor.save()
        res.status(201).json(doctor)

    })
       
    }catch(err){
        res.status(500).json({message:err.message})
    }
}