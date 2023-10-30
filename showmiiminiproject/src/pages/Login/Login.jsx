import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../config/firebase"

export default function Login(){
    const [formInput, setFormInput] = useState({
        email : "",
        password : ""
    })
    const [error, setError] = useState({
        erremail: "",
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
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/explore")
            }
        });
    }, [])
    
    function handleEmail(e){
        setFormInput({...formInput, email : e.target.value})
        console.log(formInput)
    }
    function handlePassword(e){
        setFormInput({...formInput, password : e.target.value})
        console.log(formInput)
    }

    function loginUser(userdata){
        signInWithEmailAndPassword(auth, userdata.email, userdata.password)
        .then((userCredential) => {
            console.log(userCredential)
            setAlert({...alert, m: "Logging in", style: {...alert.style, backgroundColor: "#4d8553"}})
            setLoading(false)
            const userlogged = { email : userCredential.user.email, username: userCredential.user.displayName }
            localStorage.removeItem("showmiiuser")
            localStorage.setItem('showmiiuser', JSON.stringify(userlogged))
            navigate("/explore")

        })
        .catch((error) => {
            switch(error) {
                case "auth/invalid-login-credentials":
                    setAlert({...alert, m: "Username or password is wrong.", style: {...alert.style, backgroundColor: "#ff7575"}})
                    
                    console.log(error.code,"", error.message, "what type?", typeof error.code)
                    break;
                case "auth/too-many-requests":
                    setAlert({...alert, m: "Too many tries.. Try again later", style: {...alert.style, backgroundColor: "#ff7575"}})
                    
                    console.log(error.code,"", error.message, "what type?", typeof error.code)
                    break;
                default : 
                    setAlert({...alert, m: "Hmmm...Something is wrong...", style: {...alert.style, backgroundColor: "#ff7575"}})
                    
                    console.log(error.code,"", error.message, "what type?", typeof error.code)
                    break;
            }
            setLoading(false)

        })
    }

    function handleSubmit(e){
        e.preventDefault()

        // valdiasi
        try{
            const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            
            if(formInput.email == ""){
                console.log("Email must not be empty!")
                setError({...error,
                    
                    erremail: "Email must not be empty!",
                    errpassword: ""
                })
            }else if(!emailpattern.test(formInput.email)){
                console.log("Email format is wrong.")
                setError({...error,
                    
                    erremail: "Email cant have special characters!",
                    errpassword: ""
                })
            }else if(formInput.password == ""){
                console.log("Password can not be empty.")
                setError({...error,
                    
                    erremail: "",
                    errpassword: "Password can not be empty."
                })
            }else{//if all valid

                setLoading(true)
                loginUser(formInput)
                console.log("Data accepted : ", formInput)
                setError({
                    erremail: "",
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
                                        <label className="input-label fonts24 fontw500" htmlFor="email">Email</label>
                                        <p className="login-input-error fontw500">{error.erremail}</p>
                                    </div>
                                    <input onChange={handleEmail} className="input-text fonts20 " type="text" id="email"></input>
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