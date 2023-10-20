import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../../essentialcss/essentialcss.css"
import "./EditImageInfo.css"
import TESTIMAGES from "../../testimage/TestImages";


export default function EditImageInfo(){

    return(
        <>
            <Navbar/>
                <div className="minimum-bg-height background-blue">
                    <div className="main-container">
                        <div className="page-title">
                            <p className="fonts32 fontw800">Edit Image Info</p>
                        </div>
                        <div className="main-div">
                            <div className="sub-maindiv-image">
                                <img className="image-show" src={TESTIMAGES.image1} />
                            </div>
                            <div className="sub-maindiv-infos">
                                <div className="form-container">
                                    <form>
                                        <div className="form-part">
                                            <label className="input-label fonts32 fontw500" htmlFor="inputimgname">Image Name : </label>
                                            <input className="input-imagename" name="inputimgname" type="text"/>
                                        </div>
                                        <div className="form-part">
                                            <label className="input-label fonts24 fontw700" htmlFor="inputimgname">Image Description :</label>
                                            <textarea className="input-imagedesc" name="inputimgname" type="text"></textarea>
                                        </div>
                                        <div className="form-part-final">
                                            <button className="btn-classic cancel-btn font-roboto fonts20 fontw700" type="button">Cancel</button>
                                            <button className="btn-classic finish-btn text-white font-roboto fonts20 fontw700" type="submit">Finished</button>
                                        </div>

                                    </form>
                                </div>
                            
                            </div>
                        </div>



                    </div>
                </div>
            <Footer/>
        </>
    )
}