import { useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Register.css"

import { Link } from "react-router-dom"

export default function Register(){

    const [formInput, setFormInput] = useState({
        email : "",
        username : "",
        password : ""
    })
    const [error, setError] = useState({
        erremail: "",
        errusername: "",
        errpassword: ""
    })

    function handleEmail(e){
        setFormInput({...formInput, email : e.target.value})
        console.log(formInput)
    }
    
    function handleUsername(e){
        setFormInput({...formInput, username : e.target.value})
        console.log(formInput)
    }
    function handlePassword(e){
        setFormInput({...formInput, password : e.target.value})
        console.log(formInput)
    }

    function handleSubmit(e){
        e.preventDefault()

        // valdiasi
        try{
            const usernpattern = /[!@#$%^&*()_+\-=\[\]{}|\\;:'",<>\/?]/
            const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(formInput.email == ""){
                console.log("Email must not be empty!")
                setError({...error,
                    erremail: "Email must not be empty!",
                    errusername: "",
                    errpassword: ""
                })
            }else if(emailpattern.test(formInput.email) == false){
                console.log("invalid email format.")
                setError({...error,
                    erremail: "invalid email format.",
                    errusername: "",
                    errpassword: ""
                })
            }else if(formInput.username == ""){
                console.log("Username must not be empty!")
                setError({...error,
                    erremail: "",
                    errusername: "Username must not be empty!",
                    errpassword: ""
                })
            }else if(usernpattern.test(formInput.username)){
                console.log("Username cant have special characters!")
                setError({...error,
                    erremail: "",
                    errusername: "Username cant have special characters!",
                    errpassword: ""
                })
            }else if(formInput.password == ""){
                console.log("Password can not be empty.")
                setError({...error,
                    erremail: "",
                    errusername: "",
                    errpassword: "Password can not be empty."
                })
            }else{//if all valid
                // put stuff here




                console.log("Data accepted : ", formInput)
                setError({
                    erremail: "",
                    errusername: "",
                    errpassword: ""
                })
            }
        }catch(er){
            console.log(er)
        }
        
    }
    
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
                            <form onSubmit={handleSubmit}>
                                <div className="register-form-part">
                                    <div className="register-input-label-container">
                                        <label className="input-label fonts24 fontw500" htmlFor="email">Email</label>
                                        
                                        <p className="register-input-error fontw500">{error.erremail}</p>
                                    </div>
                                    <input onChange={handleEmail} className="input-text fonts20 " type="text" id="email"></input>
                                </div>
                                <div className="register-form-part">
                                    <div className="register-input-label-container">
                                        <label className="input-label fonts24 fontw500" htmlFor="username">Username</label>
                                        <p className="register-input-error fontw500">{error.errusername}</p>
                                    </div>
                                    <input onChange={handleUsername} className="input-text fonts20 " type="text" id="username"></input>
                                </div>
                                <div className="register-form-part">
                                    <div className="register-input-label-container">
                                        <label className="input-label fonts24 fontw500" htmlFor="password">Password</label>
                                        <p className="register-input-error fontw500">{error.errpassword}</p>
                                    </div>
                                    <input onChange={handlePassword} className="input-text fonts20" type="password" id="passwhord"></input>
                                </div>
                                <div className="register-form-part">
                                    <div className="form-final-btn">
                                        <button className="btn-classic purple-btn btn-form fonts24 fontw500" type="submit">Register</button>
                                    </div>
                                </div>
                            </form>
                            <div className="container2">
                                <div className="form-final-btn">
                                    <Link to="/login">
                                        <button className="btn-classic blue-btn btn-form fonts24 fontw500" type="button">Login</button>
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