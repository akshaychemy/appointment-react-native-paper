import axios from 'axios';

import React ,{createContext,useState,useEffect,useContext} from 'react';


const AuthContext = createContext();

export const AuthProvider =({children})=>{

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const storeduser = localStorage.getItem('user');
        if(storeduser){
            setUser(JSON.parse(storeduser));
        }
    },[])

    const login = async(username,password)=>{
        try{
            const response = await axios.post('http://localhost:5000/api/users/login',{username,password})
            const {token ,user}= response.data;
            localStorage.setItem('user',JSON?.stringify(user))
            localStorage.setItem('token',token)
            setUser(user);
            alert('logged in successfully')

        }catch(err){
            console.log(err);
        }
    }

    const register = async(username, Password, role)=>{
        try{
            const response = await axios.post('http://localhost:5000/api/users/register',{username, Password, role})
            // const {token ,user}= response.data;
            // localStorage.setItem('user',JSON.stringify(user))
            // localStorage.setItem('token',token)
            // setUser(user);
            alert('regfistred')

        }catch(err){
            console.log(err);
        }
    }

    const logout =()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{user,login,logout,register}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth =()=>{
    return useContext(AuthContext);
}