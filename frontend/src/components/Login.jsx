import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"


const AuthWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
`

const AuthCard = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    h2 {
        text-align: center;
        color: #333;
        font-size: 28px;
        margin-bottom: 30px;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Input = styled.input`
    padding: 14px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
        color: #999;
    }
`

const Button = styled.button`
    padding: 0.75rem;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
    margin-top: 8px;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`

const ErrorMsg = styled.div`
    color: #e53e3e;
    font-size: 14px;
    text-align: center;
    margin: 0;
    padding: 10px;
    background: #fff5f5;
    border-radius: 6px;
    border: 1px solid #fed7d7;
`

const AuthLink = styled.div`
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-size: 14px;

    a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
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
                        <Input 
                        type="email"
                        name="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} required/>

                        <Input 
                        type="password"
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} required/>
                  
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    <Button type="submit" disabled = {loading}>{loading ? 'Logging in ...' : 'Login'}</Button>
                </Form>
                <AuthLink>Don't have an account? <Link to = "/register">Register</Link></AuthLink>
            </AuthCard>
        </AuthWrapper>
    )
}

export default Login