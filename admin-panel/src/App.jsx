import React from 'react';

import { BrowserRouter as Router ,Route,Routes,Navigate} from 'react-router-dom';
import {Container} from '@mui/material';

//component
import Navbar from './components/Navbar';
import ClinicPage from './pages/ClinicPage';
import HomePage from './pages/HomePage';
import Doctorspage from './pages/Doctorspage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/clinics' element={<ClinicPage/>}/>
      <Route path='/doctors' element={<Doctorspage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
      
    </Router>
  )
}

export default App
