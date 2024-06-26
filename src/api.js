import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React ,{createContext,useState,useEffect,useContext} from 'react';


const API_BASE_URL ='http://10.0.2.2:5000/api';


export const getClinics = async ()=>{
    try{
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/clinics`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        return response.data;

    }catch(err){
        console.log(err)
    }
}


export const getDoctors = async ()=>{
    try{
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/doctors`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data;
    }catch(err){
        console.log(err)
    }
}


export const bookAppointment = async (bookAppointmentData)=>{
    try{
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`${API_BASE_URL}/appointments`,bookAppointmentData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data;
    }catch(err){
        console.log(err)
    }
}