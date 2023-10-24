import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"

function Authentication(){
    const userlog = JSON.parse(localStorage.getItem("showmiiuser"))
    const navigate = useNavigate()
    useEffect(()=>{
        if(!userlog){
            navigate("/login")
        }
        // <Outlet/>
    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
    
}

function useAuthenticate(){
    const userlog = JSON.parse(localStorage.getItem("showmiiuser"))
    if(!userlog){
        return false
    }
    return true
}

export default Authentication
export { useAuthenticate }