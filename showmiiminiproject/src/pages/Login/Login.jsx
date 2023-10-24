import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../../api/axios"
import { Oval } from "react-loader-spinner"

export default function Login(){
    const [formInput, setFormInput] = useState({
        username : "",
        password : ""
    })
    const [error, setError] = useState({
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
    const navigate = useNavigate()
    const userlog = JSON.parse(localStorage.getItem("showmiiuser"))
    useEffect(()=>{
        if(userlog){
            navigate("/explore")
        }
        // <Outlet/>
    }, [])
    
    function handleUsername(e){
        setFormInput({...formInput, username : e.target.value})
        console.log(formInput)
    }
    function handlePassword(e){
        setFormInput({...formInput, password : e.target.value})
        console.log(formInput)
    }
    async function loginUser(userdata){
        await axios.get(baseUrl+"/users?username="+userdata.username+"&password="+userdata.password)
        .then((response)=>{
            if(response.data.length == 0){
                console.log("User not logged in")
                console.log("response:",response)
                setLoading(false)
                setAlert({...alert, m: "Username or password is wrong.", style: {...alert.style, backgroundColor: "#ff7575"}})
            }else{
                console.log("Logging user in")
                console.log("response:",response)
                setLoading(false) //disini mungkin ga perlu set lading flase idk soalnya kan entar di navigate
                setAlert({...alert, m: "Logging in", style: {...alert.style, backgroundColor: "#4d8553"}})
                localStorage.removeItem("showmiiuser")
                localStorage.setItem('showmiiuser', JSON.stringify(userdata))
                const test = JSON.parse(localStorage.getItem("showmiiuser"))
                console.log(test)
                if(!test){
                    console.log("it says its true")
                }

                navigate("/explore")

            }

            
        })
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

                setLoading(true)
                loginUser(formInput)
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
                                {
                                    alert.m ? 
                                    <p style={alert.style}>{alert.m}</p> :
                                    <></>
                                }
                                    
                                </div>
                                <div className="form-part">
                                    <div className="login-form-final-btn">

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
                                            <button className="btn-classic purple-btn btn-form fonts24 fontw500" type="submit">Login</button>
                                        }

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