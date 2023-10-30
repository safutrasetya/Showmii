import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Register.css"
import { Oval } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, set, child, get } from "firebase/database"
import { db, auth } from "../../config/firebase"

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
    }, [])


    function handleEmail(e){
        setFormInput({...formInput, email : e.target.value})
        console.log(formInput)
    }
    function handleUsername(e){
        console.log(formInput)
        if(e.target.value.length > 50){
            setError({...error,
                errusername: "Username must not exceed 50 characters!",
            })
        }else{
            setFormInput({...formInput, username : e.target.value})
            setError({...error,
                errusername: ""
            })
        }
    }
    function handlePassword(e){
        
        console.log(formInput)
        if(e.target.value.length < 6){
            setError({...error,
                errpassword: "Password must contain at least 6 characters!",
            })
        }else{
            setFormInput({...formInput, password : e.target.value})
            setError({...error,
                errpassword: ""
            })
        }
    }

    function addToAuth(userdata){
        try{
            createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser,{
                    displayName: userdata.username
                }).then(()=>{
                    const userlogged = { email : userCredential.user.email, username: userCredential.user.displayName }
                    localStorage.setItem('showmiiuser', JSON.stringify(userlogged))

                    setAlert({...alert, m: "User registered. You are now logged in!", style: {...alert.style, backgroundColor: "#4d8553"}})
                    navigate("/explore")
                })
            })
            .catch((error) => {
                console.log("err code:", error.code)
                console.log("err message:", error.message)
                console.log(error)
                switch(error.code){
                    case "auth/email-already-in-use":
                        setAlert({...alert, m: "User with that email already exists.", style: {...alert.style, backgroundColor: "#ff7575"}})
                        break;
                    default:
                        setAlert({...alert, m: "Something is wrong. Failed to register user.", style: {...alert.style, backgroundColor: "#ff7575"}})
                        break
                }
            });

        }catch(e){
            setAlert({...alert, m: "Something is wrong. Failed to register user.", style: {...alert.style, backgroundColor: "#ff7575"}})
            console.log(e)
        }
        setLoading(false)
        
    }

    function registUser(userdata){
        const dbRef = ref(db)

        get(child(dbRef, `users/${userdata.username}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                setAlert({...alert, m: "User with that username already exists.", style: {...alert.style, backgroundColor: "#ff7575"}})
                setLoading(false)

            } else {
                console.log("No data available. we can create the user")
                set(ref(db, 'users/'+userdata.username ), {
                    username: userdata.username,
                    email: userdata.email,
                }).then(()=>{
                    console.log("Data saved successfuly")
                    addToAuth(userdata)

                }).catch((e)=>{
                    console.log("from add to  DB", e)
                })
            }
        }).catch((error) => {
            console.error(error)
        })



        
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
                console.log("Invalid email format.")
                setError({...error,
                    erremail: "Invalid email format.",
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
            }else if(formInput.username.length > 50){
                console.log("Username must not be empty!")
                setError({...error,
                    erremail: "",
                    errusername: "Username must not exceed 50 characters!",
                    errpassword: ""
                })
            }else if(formInput.password == ""){
                console.log("Password can not be empty.")
                setError({...error,
                    erremail: "",
                    errusername: "",
                    errpassword: "Password can not be empty."
                })
            }else if(formInput.password.length < 6){
                console.log("Password must atleast contain 6 characters")
                setError({...error,
                    erremail: "",
                    errusername: "",
                    errpassword: "Password must at least contain 6 characters!"
                })
            }else{//=====================================================================if all valid

                const newdata = {
                    email: formInput.email,
                    username: formInput.username,
                    password: formInput.password,
                }
                setLoading(true) //akan di set ke false di fungsi inivv
                registUser(newdata)
                console.log("Data accepted (doesnt mean its in db) : ", formInput)
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