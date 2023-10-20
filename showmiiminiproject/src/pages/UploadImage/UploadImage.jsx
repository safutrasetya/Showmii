import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./UploadImage.css"
import "../../essentialcss/essentialcss.css"
import { useEffect, useState } from "react";

export default function UploadImage(){
    const [formInput, setFormInput] = useState({
        imgname : "",
        imgdesc : "",
        userid : 1,
    })
    const [fileInput, setFileInput] = useState({
        fileuploaded : null,
        filebase64format : ""
    })
     
    useEffect(() => {
        console.log("From use effect filenput : " , fileInput)
    }, [fileInput])

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(file);

            reader.onload = ()=> {
                resolve(reader.result)
            }

            reader.onerror = (error) => {
                reject(error)
            }
        })
    }

    function handleNameInput(e){
        setFormInput({...formInput,imgname : e.target.value })
        console.log(formInput)
    }

    function handleDescInput(e){
        setFormInput({...formInput,imgdesc : e.target.value })
        console.log(formInput)
    }

    const handleFileInput = (e) => {
        setFileInput({fileuploaded: e.target.files[0]})
        //set img yang akan ditampilkan jadi hasil fungsi getBase64 ini (isinya itu data url atau string)
        getBase64(e.target.files[0]).then(result => {
            setFileInput({...fileInput , filebase64format: result})
        })
        console.log(fileInput)
    }
  
    function handleSubmit(e){
        e.preventDefault()

        console.log(formInput)
        console.log(fileInput)

    }

    return (
        <>
            <Navbar/>
                <div className="background-blue minimum-bg-height">
                    <div className="container1">
                        <div className="page-title">
                            <p className="fonts32 fontw800">Upload and Show em</p>
                        </div>
                        <div className="upload-form-div">
                            <div className="upload-form-subdiv">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-part">
                                        <div className="file-dragndrop-container">
                                            <div className="sub-dragndrop image-show1-container">
                                                {
                                                    fileInput.filebase64format ? 
                                                    <img className="image-show1" src={fileInput.filebase64format}/> :
                                                    <></>
                                                }
                                            </div>
                                            <p className="sub-dragndrop fonts24 fontw500">Drop image here</p>
                                            <p className="sub-dragndrop fonts24 fontw500">or</p>
                                            <div className="sub-dragndrop">
                                                <input onChange={(e) => handleFileInput(e)} className="fileimage-input font-roboto fonts16 fontw500" type="file"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-part">
                                        <label className="input-label fonts20 fontw700" htmlFor="image-name">Image Name: </label>
                                        <input onChange={handleNameInput} value={formInput.imgname} className="image-name-input" type="text" name="image-name"></input>
                                    </div>
                                    <div className="form-part">
                                        <label className="input-label fonts20 fontw700" htmlFor="image-desc">Add Description: </label>
                                        <textarea onChange={handleDescInput} className="image-desc-input" type="text" name="image-desc"></textarea>
                                    </div>
                                    <div className="form-part-final">
                                        <button className="cancel-btn removemargin font-roboto btn-classic fonts20 fontw700" type="button">Cancel</button>
                                        <button className="upload-btn removemargin font-roboto btn-classic text-white fonts20 fontw700" type="submit">Upload!</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                
                </div>


            <Footer/>
        </>
    )
}