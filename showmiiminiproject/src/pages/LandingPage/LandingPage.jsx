import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"

import "./LandingPage.css"
import { Link } from "react-router-dom"

function LandingPage(){

    return (
        <>
            <Navbar/>
            <div className="lpbackground">
                <div className="jumbotron">
                    <div className="sub-jumbotron">
                        <div className="jumbotext">
                            <p className="fonts64 fontw700">Share your Images with millions around the world!</p>
                        </div>
                        <div className="jumbobtn">
                            <Link to="/login">
                                <button className="fonts36 fontw700 btn-jumbo">Get on with it</button>
                            </Link>
                        </div>
                    </div>
                    <div className="sub-jumbotron">
                        <img className= "jumbotronimg" src="" />
                    </div>
                
                </div>
                <div className="demo-container">
                    <div className="demo-text">
                        <p className="fonts48 fontw700">Just a taste of what we have...</p>
                    </div>
                    <div className="demo-img-container">
                        <img className="demo-img"src=""/>
                        <img className="demo-img"src=""/>
                        <img className="demo-img"src=""/>
                        <img className="demo-img"src=""/>
                    </div>
                </div>
                <div className="container-join removemargin">
                    <p className="fonts64 fontw700 ">So what are you waiting for?</p>
                    <Link to="/login">
                        <button className="fonts36 fontw700 btn-jumbo join">Join Us</button>
                    </Link>
                </div>
            </div>
            <Footer/>
            
        </>
    )
}


export default LandingPage