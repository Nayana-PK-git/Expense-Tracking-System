import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export function AuthProvider({ children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) loadUser(token);
        else setLoading(false);
    },[])

    const loadUser = async(token)=>{
        try {
            const res=await fetch(`${API_URL}/auth/me`,{
                headers:{'Authorization':`Bearer ${token}`}
            });
            if(res.ok){
                const userData = await res.json();
                setUser(userData);
            }else{
                localStorage.removeItem('token');
            }
        } catch (error) {
            localStorage.removeItem('token')
        }
        setLoading(false)
    };


    const login = async (email , password)=>{
        const res=await fetch(`$API_URL`)
    }
}