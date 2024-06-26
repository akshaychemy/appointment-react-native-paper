import axios from 'axios';

export const API = axios.create({baseURL:'http://localhost:5000'})

export const fetchClinics=()=> API.get('/api/clinics')
export const createClinic =(newClinic)=> API.post('/api/clinic',newClinic)


export const fetchDoctors=()=> API.get('/api/doctors')
export const createDoctor =(newDoctor)=> API.post('/api/doctors',newDoctor)