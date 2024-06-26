import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const {login} = useAuth()
    const [username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, Password)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div>
            <Typography variant='h4'>Login</Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    lable='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <TextField
                    lable='Password'
                    type='password'
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)} />
               
                <Button type='submit' variant='contained' color='primary'>Login</Button>
            </form>

        </div>
  )
}
