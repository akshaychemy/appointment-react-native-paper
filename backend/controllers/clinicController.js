import Clinic  from '../models/Clinic.js'
import upload from '../middleware/fileUpload.js'

import path from 'path';
import multer from 'multer';

export const getClinics = async (req,res)=>{
    try{
        const clinics = await Clinic.find()
        res.status(200).json(clinics)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}



export const createClinic = async (req,res)=>{
    // console.log("==>",req)
    try{
        upload.single('image')(req,res,async(err)=>{
            if(err instanceof multer.MulterError){
                res.status(400).json({"message":'file upload error',error:err.message})
            }else if(err){
                res.status(500).json({"message":'internal server error',error:err.message})
            }
        

        const {name,address,service,description} = req.body

        if (!req.file) {
            return res.status(400).json({ "message": 'No file uploaded' });
        }

        const imagepath = req.file.path;
        console.log("==>")
        const filename = path.basename(imagepath)

        const serviesArray = service?.split(',').map((service)=>service.trim()).filter(service=>service)
        console.log("==>",serviesArray)

        const clinic = new Clinic({name,address,services:serviesArray,image:filename,description})
        await clinic.save()
        res.status(201).json(clinic)

    })
       
    }catch(err){
        res.status(500).json({message:err.message})
    }
}