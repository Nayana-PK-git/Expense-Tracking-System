import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styled from "styled-components";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
`

const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`
const Title = styled.h2`
    text-align: center;
    color: #333;
    font-size: 28px;
    margin-bottom: 30px;
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

const ErrorText = styled.p`
    color: #e53e3e;
    font-size: 14px;
    text-align: center;
    margin: 0;
    padding: 10px;
    background: #fff5f5;
    border-radius: 6px;
    border: 1px solid #fed7d7;
`

const LinkText = styled.p`
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


function UserRegister(){
    const [formData,setFormData] = useState({
        name : '',
        email : '',
        password : '',
        ConfirmPassword : ''
    });
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if(formData.password !== formData.ConfirmPassword){
            setError('Password do not match')
            return
        }

        if(formData.password.length < 6) {
            setError('Password must be atleast 6 characters')
            return
        }

        setLoading(true)
        try {
            await register(formData.name, formData.email, formData.password)
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.msg || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }
    return(
        <Container>
            <Card>
                <Title>Create Account</Title>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={handleChange}
                        required />

                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required />

                    <Input
                        type="password"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required />

                    {error && <ErrorText>{error}</ErrorText>}
                   
                    <Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</Button>
                </Form>
                <LinkText>Alredy have an account?<Link to="/login">Login</Link></LinkText>
            </Card>
        </Container>
    )
}

export default UserRegister