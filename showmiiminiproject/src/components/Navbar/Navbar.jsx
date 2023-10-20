import { Link } from 'react-router-dom';

import "../../essentialcss/essentialcss.css"
import "./Navbar.css"

export default function Navbar(){


    return (
        <>
            <nav className="navbar navbar-container ps-3 shadow-sm">
                <Link to="/" className="brand fonts36 fontw700 ps-5" aria-current="page">
                    S h o w m i i
                </Link>
                <div>
                    <ul className="nav nav-pills justify-content-end fontroboto">
                        <li className="nav-item mx-3">
                            <Link to="/explore" className="" aria-current="page">
                                <button className="navbtn navbtnnotlast btn-purple fonts20 fontw700">Explore!</button>
                            </Link>
                        </li>
                        <li className="nav-item mx-3 ">
                            <Link to="/" className="" aria-current="page">
                                <button className="navbtn navbtnnotlast btn-blue fonts20 fontw700">About Us</button>
                            </Link>
                        </li>
                        <li className="nav-item ms-3 me-5">
                            <Link to="/login" className="" aria-current="page">
                                <button className="navbtn btn-red fonts20 fontw700">Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        
        </>
    )
}