import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Register.css"
import { baseUrl } from "../../api/axios"
import axios from "axios"
import { Oval } from "react-loader-spinner"

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
    const [alert, setAlert] = useState({
        m: "",
        style: {
            backgroundColor: "#ff7575",
            color: "white",
            transition: "0.5s",
            padding: "5px 15px",
            borderRadius: "30px",
        }
    })
    const [loading, setLoading] = useState(false)

    const userlog = JSON.parse(localStorage.getItem("showmiiuser"))
    useEffect(()=>{
        if(userlog){
            navigate("/explore")
        }
        // <Outlet/>
    }, [])


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

    async function checkUserEmail(userdata){
        const response = await axios.get(baseUrl+"/users?email="+userdata.email)
        if(response.data.length > 0){
            setAlert({...alert, m: "User with that email already exists.", style: {...alert.style, backgroundColor: "#ff7575"}})
            return true
        }else{
            return false
        }
    }
    async function checkUserName(userdata){
        const response = await axios.get(baseUrl+"/users?username="+userdata.username)
        if(response.data.length > 0){
            setAlert({...alert, m: "User with that username already exists.", style: {...alert.style, backgroundColor: "#ff7575"}})
            return true
        }else{
            return false
        }
    }
    async function userRegister(userdata){
        await axios.post(baseUrl+"/users", userdata)
        .then((response)=>{
            if(response.statusText === "Created"){
                setAlert({...alert, m: "User registered. You can now login", style: {...alert.style, backgroundColor: "#4d8553"}})
            }else{
                setAlert({...alert, m: "Something is wrong. Failed to register user.", style: {...alert.style, backgroundColor: "#ff7575"}})
            }
            console.log(response)
        })
    }

    async function registerUser(userdata){
        try{

            const emailcek = await checkUserEmail(userdata)
            const usernamecek = await checkUserName(userdata)

            if(!emailcek && !usernamecek){
                await userRegister(userdata)
            }else if(emailcek && usernamecek){
                setAlert({...alert, m: "User with that email & name already exists.", style: {...alert.style, backgroundColor: "#ff7575"}})
            }

        }catch(e){
            setAlert({...alert, m: "Something is wrong. Failed to register user.", style: {...alert.style, backgroundColor: "#ff7575"}})
            console.log(e)
        }
        setLoading(false)
        
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
            }else{//=====================================================================if all valid

                const newdata = {
                    email: formInput.email,
                    username: formInput.username,
                    password: formInput.password,
                }
                setLoading(true) //akan di set ke false di fungsi inivv
                registerUser(newdata).then(()=>{
                    console.log("Data accepted (doesnt mean its in db) : ", formInput)
                    setError({
                        erremail: "",
                        errusername: "",
                        errpassword: ""
                    })
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

                                {
                                    alert.m ? 
                                    <p style={alert.style}>{alert.m}</p> :
                                    <></>
                                }
                                
                                </div> 
                                
                                <div className="register-form-part">
                                    <div className="register-form-final-btn">

                                        {
                                            loading ? 
                                            <Oval
                                            height={30}
                                            width={30}
                                            color="white"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                            ariaLabel='oval-loading'
                                            secondaryColor="green"
                                            strokeWidth={2}
                                            strokeWidthSecondary={2}
                                            /> :
                                            
                                            <button className="btn-classic purple-btn btn-form fonts24 fontw500" type="submit">Register</button>
                                            
                                        }
                                    </div>
                                    
                                </div>
                            </form>
                            <div className="container2">
                                <div className="">
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