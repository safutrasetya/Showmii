import { useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Login.css"
import { Link } from "react-router-dom"

export default function Login(){
    const [formInput, setFormInput] = useState({
        username : "",
        password : ""
    })
    const [error, setError] = useState({
        errusername: "",
        errpassword: ""
    })
    
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
            
            if(formInput.username == ""){
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
                console.log("Data accepted : ", formInput)
                setError({
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
                        <p className="loginregisterp fonts32 fontw700">Login</p>
                    </div>
                    <div className="main-content">
                        <div className="main-content-block">
                            <form onSubmit={handleSubmit}>
                                <div className="form-part">
                                    <div className="login-input-label-container">
                                        <label className="input-label fonts24 fontw500" htmlFor="username">Username</label>
                                        <p className="login-input-error fontw500">{error.errusername}</p>
                                    </div>
                                    <input onChange={handleUsername} className="input-text fonts20 " type="text" id="username"></input>
                                </div>
                                <div className="form-part">
                                    <div className="login-input-label-container">
                                        <label className="input-label fonts24 fontw500" htmlFor="password">Password</label>
                                        <p className="login-input-error fontw500">{error.errpassword}</p>
                                    </div>
                                    <input onChange={handlePassword} className="input-text fonts20" type="password" id="passwhord"></input>
                                </div>
                                <div className="form-part">
                                    <div className="form-final-btn">
                                        <button className="btn-classic purple-btn btn-form fonts24 fontw500" type="submit">Login</button>
                                    </div>
                                </div>
                            </form>
                            <div className="container2">
                                <div className="form-final-btn">
                                    <Link to="/register">
                                        <button className="btn-classic blue-btn btn-form fonts24 fontw500" type="submit">Register</button>
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