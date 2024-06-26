import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'



import { v4 as uuidv4} from 'uuid';
import { fileURLToPath} from 'url';
import { dirname,join} from 'path';
import upload from './middleware/fileUpload.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//routes
import userRoutes from './routes/authRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';


dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads',express.static(join(__dirname,'uploads')));

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.post('api/upload',upload.single('file'),(req,res)=>{
    res.send("file Uploaded successfully")
})

app.use('/api/users',userRoutes)
app.use('/api/clinics',clinicRoutes)
app.use('/api/doctors',doctorRoutes)
app.use('/api/appointments',appointmentRoutes)

app.get('/',(req,res)=>{
    res.send('appoint backend is running')
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})