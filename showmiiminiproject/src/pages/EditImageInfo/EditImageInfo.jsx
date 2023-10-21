import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../../essentialcss/essentialcss.css"
import "./EditImageInfo.css"
import TESTIMAGES from "../../testimage/TestImages";
import { useState } from "react";


export default function EditImageInfo(){

    const [formInput, setFormInput] = useState({
        imgname: "" ,
        imgdesc : ""
    })
    const [error, setError] = useState("")
    function handleImgName(e){
        setFormInput({...formInput, imgname : e.target.value})
        console.log(formInput)
    }

    function handleImgDesc(e){
        setFormInput({...formInput, imgdesc : e.target.value})
        console.log(formInput)
    }

    function handleSubmit(e){
        e.preventDefault()
        const pattern = /[{}+=><`;\:]/
        // validasi
        if(formInput.imgname == ""){
            setError("Image name can not be empty")
        }else if(pattern.test(formInput.imgname)){
            setError("Image name must not contain {}+=><`;\\: characters!")
        }else{ // if all valid
            console.log("Data accepted ", formInput)
            setError("")
        
        }


    }

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
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-part">
                                            <label className="input-label fonts32 fontw500" htmlFor="inputimgname">Image Name : </label>
                                            <input onChange={handleImgName} className="input-imagename" name="inputimgname" type="text"/>
                                        </div>
                                        <div className="form-part">
                                            <label className="input-label fonts24 fontw700" htmlFor="inputimgname">Image Description :</label>
                                            <textarea onChange={handleImgDesc} className="input-imagedesc" name="inputimgname" type="text"></textarea>
                                        </div>
                                        <div className="form-part">

                                            {error ? 
                                                <div className="alert">
                                                    <div className="alert alert-danger" role="alert">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                        </svg>
                                                        <span className="font-roboto removemargin"> {error}</span>
                                                    </div>
                                                </div> :
                                                <></>
                                            }
                                            
                                        </div>
                                        <div className="form-final-container">
                                            <div>
                                                <button className="btn-classic red-btn font-roboto fonts20 fontw700" type="button">Delete</button>
                                            </div>
                                            <div>
                                                
                                                <button className="btn-classic cancel-btn font-roboto fonts20 fontw700" type="button">Cancel</button>
                                                <button className="btn-classic finish-btn text-white font-roboto fonts20 fontw700" type="submit">Finished</button>
                                            </div>
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