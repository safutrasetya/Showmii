import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"

import "./Explore.css"
import TESTIMAGES from "../../testimage/TestImages"

export default function Explore(){


    return (
        <>
            <Navbar />
            <div className="container1 background-blue">
                <div className="page-title">
                    <p className="fontw800 fonts36">Explore</p>
                </div>
                <div className="images-container">
                    <div className="image-container">
                        <img src={TESTIMAGES.image1} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image2} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image1} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image1} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image2} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image1} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image2} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image1} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image1} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>
                    <div className="image-container">
                        <img src={TESTIMAGES.image2} className="img-bg rounded-top-5" alt="imgname"/>
                        <p className="fonts24 fontw500">Judul image</p>
                        <p className="fonts16">By Someone</p>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}