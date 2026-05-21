import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"


const AuthWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    padding: 1rem;
`

const AuthCard = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h2 {
        text-align: center;
        color: #1f2937;
        margin-bottom: 1.5rem;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Input = styled.input`
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #2563eb;
    }
`

const Button = styled.button`
    padding: 0.75rem;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #1d4ed8;
    }

    &:disabled {
        background: #9ca3af;
    }
`

const ErrorMsg = styled.div`
    background: #fef2f2;
    color: #dc2626;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
`

const AuthLink = styled.div`
    text-align: center;
    margin-top: 1rem;
    color: #6b7280;

    a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
    }
`

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login(email,password)
            navigate('/')
        } catch (error) {
            setError(error.msg || 'Login failed')
        } finally {
            setLoading(false)
        }
    }
    return(
        <AuthWrapper>
            <AuthCard>
                {/* <h1>Expense Tracker</h1> */}
                <h2>Login</h2>

                <Form onSubmit={handleSubmit}>
                    
                        <label>Email:</label>
                        <Input type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} required/>

                   
                        <label>Password:</label>
                        <Input type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} required/>
                  
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    <Button type="submit" disabled = {loading}>{Loading ? 'Logging in ...' : 'Login'}</Button>
                    <p className="link-text">Don't have an account? <button className="link-btn"> Register </button> </p>
                </Form>
                <AuthLink>Don't have an account? <Link to = "/register">Register</Link></AuthLink>
            </AuthCard>
        </AuthWrapper>
    )
}

export default Login