import { useState } from "react"
import "./css/Login.css"

function Login(){
    return(
        <div className="auth-container">
            <div className="auth-card">
                <h1>Expense Tracker</h1>
                <h2>Login</h2>

                <form action="">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" />
                    </div>

                    <button type="submit" className="submit-btn">Login</button>
                    <p className="link-text">Don't have an account? <button className="link-btn"> Register </button> </p>
                </form>
            </div>
        </div>
    )
}

export default Login