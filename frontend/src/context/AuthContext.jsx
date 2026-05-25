import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../Api/api'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        checkAuth();
    },[])

    const checkAuth = async () => {
        try {
            const data = await api.get('/user/me')
            setUser(data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const register = async(name,email,password) => {
        const data = await api.post('/user/registeruser')
        setUser(data.user)
    }

    const login = async (email,password) => {
        const data = await api.post('/user/loginuser')
        setUser(data.user)
    }

    const logout = async () => {
        await api.post('/user/logoutuser')
        setUser(null)
    }

    const value = {user,loading,register,login,logout}

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}

