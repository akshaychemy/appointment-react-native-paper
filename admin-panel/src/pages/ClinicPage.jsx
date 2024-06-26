import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/AuthContext';

export default function ClinicPage() {
    const { user } = useAuth()
    const [clinics, setClinics] = useState([])
    const [clinicName, setClinicName] = useState('name')
    const [clinicImage, setClinicImage] = useState('')
    const [clinicDescription, setClinicDescription] = useState('description')
    const [clinicServices, setClinicServices] = useState('services1,service2')

    const navigate = useNavigate()

    useEffect(() => {
        const fecthClinics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/clinics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                console.log("response", response)
                setClinics(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fecthClinics();
    }, [])

    const handleImage = (e) => {
        const file = e.target.files[0];
        setClinicImage(file)
    }

    const addClinic = () => {
        const formData = new FormData()
        formData.append('name', clinicName)
        formData.append('description', clinicDescription)
        formData.append('services', clinicServices)
        formData.append('image', clinicImage)
        console.log("formData", formData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = axios.post('http://localhost:5000/api/clinics', formData, config)
            .then((response) => {
                console.log("data==>", response)
                navigate('/clinics')
            })
            .catch((err) => {
                console.log(err)
            })

        setClinics([...clinics, response.data])
        setClinicName('')
        setClinicDescription('')
        setClinicServices('')
        setClinicImage('')

    }


    return (
        <div className='container'>
            <Typography variant='h4' className='title'>Clinic</Typography>
            <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                    lable='clinic name'
                    value={clinicName}
                    className='inputField'
                    onChange={(e) => setClinicName(e.target.value)} />
                <TextField
                    lable='Description'
                    className='inputField'
                    value={clinicDescription}
                    onChange={(e) => setClinicDescription(e.target.value)} />
                <TextField
                    lable='services (comma separated)'
                    className='inputField'
                    value={clinicServices}
                    onChange={(e) => setClinicServices(e.target.value)} />
                <TextField
                    type='file'
                    accept='image/*'
                    className='fileInput'
                    // value={clinicImage}
                    onChange={handleImage} />
                <Button type='submit' onClick={addClinic} variant='contained' color='primary' className='submitButton'>Add Clinic</Button>
            </form>
            <ul className='clinicList'>
                {
                    clinics?.map((clinic,i) => {
                        return (
                            <li key={clinic?._id ? clinic?._id:i} className='clinicItem'>
                                <h3 className='clinicName'>{clinic?.name}</h3>
                                <p className='clinicDescription'>{clinic?.description}</p>
                                <p className='clinicServices'>{clinic?.services?.join(', ')}</p>
                                <div className='clinicImageContainer'>
                                    <img src={`http://localhost:5000/uploads/${clinic?.image}`} alt={clinic?.name} className='clinicImage' />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

            <style jsx>{`
        .container{
        max-width:800px;
        margin:20px auto;
        padding:20px;
        border:1px solid #ccc;
        border-radius:8px;
        background-color:#f9f9f9;
        }
        .title{
        font-size:24px;
        text-align:center;
        margin-bottom:20px;
        color:#333
        }
        .inputField{
        width:100%;
        margin-bottom:20px;
        }
        .fileInput{
        margin-bottom:20px;
        }
        .submitButton{
        display:block;
        margin:0 auto;
        padding:10px 20px;
        background-color:#333;
        color:#fff;
        border:none;
        border-radius:4px;
        cursor:pointer;
        }
        .clinicList{
        list-style-type: none;
        padding:0;}
        .clinicItem{
        margin-bottom:20px;
        padding:15px;
        background-color:#fff;
        border:1px solid #ccc;
        border-radius:8px;}
        .clinicImageContainer:{
        text-align:center;
        }
        .clinicImage{
        max-width:100%;
        height:auto;
        border-radius:8px}
        .clinicName{
        font-size:18px;
        font-weight:bold;
        margin-bottom:10px;
        }
        `}</style>
        </div>
    )
}
