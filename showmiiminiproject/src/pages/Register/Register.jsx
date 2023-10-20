import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Register.css"

import { Link } from "react-router-dom"

export default function Register(){


    
    
    
    
    return (
        <>
            <Navbar/>
            <div className="overlay">
                <div className="login-container">
                    <div className="header">
                        <p className="loginregisterp fonts32 fontw700">Register</p>
                    </div>
                    <div className="main-content">
                        <div className="main-content-block">
                            <form action="#">
                                <div className="form-part">
                                    <label className="input-label fonts24 fontw500" htmlFor="username">Email</label>
                                    <input className="input-text fonts20 " type="email" id="username"></input>
                                </div>
                                <div className="form-part">
                                    <label className="input-label fonts24 fontw500" htmlFor="username">Username</label>
                                    <input className="input-text fonts20 " type="text" id="username"></input>
                                </div>
                                <div className="form-part">
                                    <label className="input-label fonts24 fontw500" htmlFor="password">Password</label>
                                    <input className="input-text fonts20" type="password" id="passwhord"></input>
                                </div>
                                <div className="form-part">
                                    <div className="form-final-btn">
                                        <button className="btn-classic purple-btn btn-form fonts24 fontw500" type="submit">Register</button>
                                    </div>
                                </div>
                            </form>
                            <div className="container2">
                                <div className="form-final-btn">
                                    <Link to="/login">
                                        <button className="btn-classic blue-btn btn-form fonts24 fontw500" type="submit">Login</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}