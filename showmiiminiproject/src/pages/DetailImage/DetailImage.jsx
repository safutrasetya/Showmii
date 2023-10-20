import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import TESTIMAGES from "../../testimage/TestImages"

import "./DetailImage.css"

export default function DetailImage(){


    return  (
        <>
            <Navbar/>
                <div className="detailimage-container background-blue">
                    <div className="image-show-maindiv">
                        <img src={TESTIMAGES.image1} className="image-main" />
                    </div>
                    <div className="detail-div">
                        <div className="sub-detail-div">
                            <div className="image-detail-div">
                                <p className="fontw800 fonts36">Image Name</p>
                            </div>
                            <div className="image-detail-div">
                                <p className="fontw500 fonts32">By Somebody</p>
                            </div>
                            <div className="image-detail-div">
                                <p className="fontw500 fonts24">some lorem ipsum Some lorem ipsum here as dess. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat leo ex, sed varius neque ultrices vel. Cras sed nulla consequat, imperdiet eros eu, fermentum lorem. Ut id maximus quam. Donec magna eros, faucibus quis posuere a, mattis quis tortor. Suspendisse potenti. Ut eget condimentum turpis, ac vestibulum diam. Ut mollis mauris dolor, eget sollicitudin magna consequat ut. Nulla fringilla, leo ac varius iaculis, diam metus bibendum ipsum, quis fringilla est turpis ut tortor. Aliquam rutrum tincidunt diam, id feugiat libero malesuada a. Donec posuere ipsum non ex lacinia congue. Sed pharetra nec lorem finibus gravida. Curabitur ullamcorper felis at viverra vestibulum. Integer ut pellentesque nibh.</p>
                            </div>
                        </div>
                    </div>
                </div>  
            <Footer/>
        </>
    )
}