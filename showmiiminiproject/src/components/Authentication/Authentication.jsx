import { useEffect } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import Login from "../../pages/Login/Login"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function Authentication(){// this is for redirecting
    const navigate = useNavigate()
    const locatioon = useLocation();
    useEffect(()=>{
        // const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if(locatioon.pathname == "/" || locatioon.pathname == "/register"){
                navigate("/explore")
            }
            }else{
                console.log("User is not signed in")
                navigate("/login")
            }
        });
    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
    
}

function useAuthenticate(){ //this is for navbar
    // const auth = getAuth();
    let sign
    onAuthStateChanged(auth, (user) => {
        if (user) {
            sign = true
        }else{
            sign = false
        }
    });
    return sign
}

function Logout(){
    const navigate = useNavigate()
    useEffect(()=>{
        // const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem("showmiiuser")
            console.log("we should be at login")
            navigate("/login")
        }).catch((error) => {
            console.log("Something wrong happened")
        });

    }, [])
    
    return (
        <>
            <Login/>
        </>
    )
}

export default Authentication
export { useAuthenticate, Logout }