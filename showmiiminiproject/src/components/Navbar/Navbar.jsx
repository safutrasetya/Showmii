import { Link } from 'react-router-dom';

import "../../essentialcss/essentialcss.css"
import "./Navbar.css"

import TESTIMAGES from '../../testimage/TestImages';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Navbar(){
    const [checkAuth, setCheckauth] = useState(true)
    const [userdata, setUserData] = useState({})
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //user dah login
                const emailsplit = user.email.split("@");
                const emailfront = emailsplit[0]
                console.log(user)

                setUserData({
                    email : user.email,
                    displayName : user.displayName,
                    emailFront: emailfront
                })
                setCheckauth(true)
            }else{
                //user belom login
                setCheckauth(false)
            }
        
        });
    }, [])

    return (
        <>
            <nav className="navbar navbar-container ps-3 shadow-sm">
            {
                checkAuth ? 
                <Link to="/explore" className="brand fonts36 fontw700 ps-5" aria-current="page">
                    S h o w m i i
                </Link>:
                <Link to="/landingpage" className="brand fonts36 fontw700 ps-5" aria-current="page">
                    S h o w m i i
                </Link>
            }
                <div>
                    <ul className="nav nav-pills justify-content-end fontroboto">
                        <li className="nav-item mx-2">
                            <Link to="/explore" className="" aria-current="page">
                                <button className="navbtn navbtnnotlast btn-purple fonts20 fontw700">Explore!</button>
                            </Link>
                        </li>
                        <li className="nav-item mx-2 ">
                            <Link to="/faq" className="" aria-current="page">
                                <button className="navbtn navbtnnotlast btn-blue fonts20 fontw700">FAQ</button>
                            </Link>
                        </li>
                        {
                            checkAuth ? 
                            <>  
                                
                                <li className="nav-item ms-2 me-3">
                                    <Link to="/uploadimage" className="" aria-current="page">
                                        <button className="navbtn btn-red fonts20 fontw700">Upload!</button>
                                    </Link>
                                </li>
                                <div className='navbar-profile-group mx-2'>
                                    <div className='navbar-name'>Hello, {userdata.emailFront}!</div>
                                    <div className="btn-group">
                                        <img src={TESTIMAGES.image1} className='navbar-profile-img me-5 ms-1 dropdown-toggle' data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"/>
                                        <ul className="dropdown-menu dropdown-menu-lg-end me-5">
                                            <li>
                                                <Link to="/logout" className="dropdown-item text-danger" aria-current="page">
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>

                            :
                            <>
                                <li className="nav-item ms-2 me-3">
                                    <Link to="/login" className="" aria-current="page">
                                        <button className="navbtn btn-red fonts20 fontw700">Login</button>
                                    </Link>
                                </li>
                            </>
                            
                        }

                        
                    </ul>
                </div>
            </nav>

        
        </>
    )
}