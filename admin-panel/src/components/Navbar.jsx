import React from 'react'
import { AppBar, Toolbar, Typography, Button, } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';


import { useAuth } from '../context/AuthContext';


export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    admin Panel
                </Typography>
                {
                    user ? (
                        <>
                            <Button color='inherit' component={Link} to='/'>
                                Home
                            </Button>
                            {
                                user.user.role === 'superuser' && (
                                    <>
                                        <Button color='inherit' component={Link} to='/clinics'>
                                            Clinics
                                        </Button>
                                        <Button color='inherit' component={Link} to='/doctors'>
                                            Doctors
                                        </Button>
                                    </>
                                )}
                            <Button color='inherit' onClick={handleLogout}>
                                Logout
                            </Button>

                            
                        </>
                    ) : (
                        <Button color='inherit' component={Link} to='/login'>
                            Login
                        </Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}
