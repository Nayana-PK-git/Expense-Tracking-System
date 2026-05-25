import { useState } from "react";
// import "./css/UserRegister.css"
import styled from "styled-components";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
`

const AuthCard = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 2.5rem;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0, 3);
`
const AuthCard = styled.h1`
    text-align: center;
    color: #2563eb;
    font-size: 1.75rem;
    margin-bottom: 1rem;
`

const AuthCard = styled.h2`
    text-align: center;
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
`

// const Form = styled.div`
//     margin-bottom: 1.25rem;
// `


function UserRegister(){
    // const [formData,setFormData] = useState({
    //     name : '',
    //     email : '',
    //     password : '',
    //     confirmPassword : ''
    // });
    return(
        <Container>
            <AuthCard>
                <h1>Expense Tracker</h1>
                <h2>Create Account</h2>

                <Form action="">
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"  />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" />
                    </div>
                   
                    <button type="submit" className="submit-btn">Register</button>
                    <p className="switch-text"> Alredy have an account? <button className="link-btn"> Login </button></p>
                </Form>
            </AuthCard>

        </Container>
    )

}

export default UserRegister