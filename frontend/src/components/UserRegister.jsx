import { useState } from "react";
import "./css/UserRegister.css"

function UserRegister(){
    // const [formData,setFormData] = useState({
    //     name : '',
    //     email : '',
    //     password : '',
    //     confirmPassword : ''
    // });
    return(
        <div className="auth-container">
            <div className="auth-card">
                <h1>Expense Tracker</h1>
                <h2>Create Account</h2>

                <form action="">
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
                </form>
            </div>

        </div>
    )

}

export default UserRegister