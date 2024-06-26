import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import { useAuth } from '../context/AuthContext';


export default function RegisterPage() {
    const {register} = useAuth()
    const [username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()


    const handleRegister = async (e) => {
        console.log("==>", username, Password, role)
        e.preventDefault();
        try {
            register(username, Password, role)
        //    const data= await axios.post('http://localhost:5000/api/users/register', { username, Password, role })
        //    console.log("data",data)
            // alert('Register Success')
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Typography variant='h4'>Register</Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    lable='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <TextField
                    lable='Password'
                    type='password'
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)} />
                <FormControl id='role-lable' fullwidth required>
                    <InputLabel id='role-lable'>Role</InputLabel>
                    <Select
                        labelId='role-lable'
                        id='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <MenuItem value='user'>user</MenuItem>
                        <MenuItem value='superuser'>superuser</MenuItem>
                        <MenuItem value='admin'>admin</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit' variant='contained' color='primary'>Register</Button>
            </form>

        </div>
    )
}
