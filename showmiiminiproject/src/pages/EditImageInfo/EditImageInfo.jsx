import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../../essentialcss/essentialcss.css"
import "./EditImageInfo.css"
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ref as refToDB, child, get, update } from "firebase/database"
import { db } from "../../config/firebase"
import DeleteImageFromStorage from "../../components/DeleteImageFunc/DeleteImageFunc";


import Modal from "../../components/Modal/Modal";

export default function EditImageInfo(){

    const [formInput, setFormInput] = useState({
        imgname: "" ,
        imgdesc : ""
    })
    const [alert, setAlert] = useState({
        m: "",
        style: {
            backgroundColor: "#ff7575",
            color: "white",
            transition: "0.5s",
            padding: "5px 15px",
            borderRadius: "30px",
        }
    })
    const [imageNonInput, setImageNonImput]= useState({
        imageurl: "",
        imageid: "",
        imageposter: ""
    })
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [finished, setFinished] = useState(false)


    const {imageid} = useParams()
    const navigate = useNavigate()

    
    function handleImgName(e){
        setFormInput({...formInput, imgname : e.target.value})
        console.log(formInput)
    }
    function handleImgDesc(e){
        setFormInput({...formInput, imgdesc : e.target.value})
        console.log(formInput)
    }

    useEffect(()=>{
        getImageData()
    }, [])

    function getImageData(){
        const dbRef = refToDB(db);
        get(child(dbRef, `imageposts/${imageid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val()
                setImageNonImput({
                    imageurl: data.imageurl,
                    imageid: imageid,
                    imageposter: data.imageposter
                })

                setFormInput({
                    imgdesc: data.imagedesc,
                    imgname: data.imagename
                })
            } else {
                setAlert({...alert, m: "Image not found.", style: {...alert.style, backgroundColor: "#ff7575"}})
                console.log("No data available we can put it inside");
                navigate("/err404")


            }
        }).catch((error) => {
            setAlert({...alert, m: "Something is wrong", style: {...alert.style, backgroundColor: "#ff7575"}})
            console.error(error);
        });
    }

    function updateImageData(){
        setLoading(true)
        const newdata = {
            imagename: formInput.imgname,
            imagedesc: formInput.imgdesc,
            imageurl: imageNonInput.imageurl,
            imageposter: imageNonInput.imageposter,
        }
        const updates = {}
        updates['imageposts/' + imageid] = newdata
        update(refToDB(db), updates).then(()=>{
            setAlert({
                ...alert, m: "Successfully updated!",
                style : {...alert.style, backgroundColor: "#4d8553"}
            })
            setLoading(false)
            setFinished(true)
        }).catch((e)=>{
            setAlert({
                ...alert, m: "Somethig is wrong...",
                style : {...alert.style, backgroundColor: "#ff7575"}
            })
            console.log("Something is wrong when updating the image info", e)
            setLoading(false)
        });



    }

    function deleteImageData(){
        setOpenModal(false)
        setLoading(true)
        const updates = {}
        updates['imageposts/' + imageid] = null
        update(refToDB(db), updates).then(()=>{
            DeleteImageFromStorage(imageid).then((res) => {
                if(res == "success"){
                    setAlert({
                        ...alert, m: "Successfully deleted! Redirecting...",
                        style : {...alert.style, backgroundColor: "#4d8553"}
                    })
                    setTimeout(navigate("/explore"), 1000);
                }else{
                    setAlert({
                        ...alert, m: "Something is wrong...",
                        style : {...alert.style, backgroundColor: "#ff7575"}
                    })
                    console.log(delstatus)
                }
                setLoading(false)
            })
        }).catch((e)=>{
            setAlert({
                ...alert, m: "Something is wrong...",
                style : {...alert.style, backgroundColor: "#ff7575"}
            })
            console.log("something is wrong when deleting from database", e)
        });

    }

    function handleSubmit(e){
        e.preventDefault()
        const pattern = /[{}+=><`;\:]/
        // validasi
        if(formInput.imgname == ""){
            setAlert({...alert, m: "Image name can not be empty", status : "NOT OK"})
        }else if(pattern.test(formInput.imgname)){
            setAlert({...alert, m: "Image name must not contain {}+=><`;\\: characters!", status : "NOT OK"})
        }else{ // if all valid
            console.log("Data accepted ", formInput)
            updateImageData()
            setAlert({...alert, m: ""})
        
        }
    }

    function handleDelete(){
        setOpenModal(true)
    }

    return(
        <>
            <Modal 
            modalheader={"Delete image"}  
            modalcontent={"Are you sure you want to delete this image?"}
            modalyesbtnstyle={"btn-classic red-btn me-4 fontw700"}
            modalnobtnstyle={"btn-classic blue-btn fontw700"}

            openStatus={openModal} onYes={deleteImageData} closeModal={()=> setOpenModal(false)}  />
            <Navbar/>

                <div className="minimum-bg-height background-blue">
                    <div className="main-container">
                        <div className="page-title">
                            <p className="fonts32 fontw800">Edit Image Info</p>
                        </div>
                        <div className="main-div">
                            <div className="sub-maindiv-image">
                                <img className="image-show" src={imageNonInput.imageurl} />
                            </div>
                            <div className="sub-maindiv-infos">
                                <div className="form-container">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-part">
                                            <label className="input-label fonts32 fontw500" htmlFor="inputimgname">Image Name : </label>
                                            <input value={formInput.imgname} onChange={handleImgName} className="input-imagename" name="inputimgname" type="text"/>
                                        </div>
                                        <div className="form-part">
                                            <label className="input-label fonts24 fontw700" htmlFor="inputimgname">Image Description :</label>
                                            <textarea value={formInput.imgdesc} onChange={handleImgDesc} className="input-imagedesc" name="inputimgname" type="text"></textarea>
                                        </div>
                                        <div className="form-part">

                                            {
                                                alert.m ? 
                                                <p style={alert.style}>
                                                    {alert.m}
                                                </p> :
                                                loading ? 
                                                <p className="p-processing">Processing...</p> :
                                                <></>
                                            }
                                            
                                        </div>
                                        <div className="form-final-container">
                                            <div>
                                                <button onClick={handleDelete} className="btn-classic red-btn font-roboto fonts20 fontw700" type="button">Delete</button>
                                            </div>
                                            <div>
                                                
                                                {
                                                    finished ? 
                                                    <Link to={"/detailimage/"+imageid}>
                                                        <button className="btn-classic btn-darkblue text-white font-roboto fonts20 fontw700 cek-btn" type="button">Check</button>
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                
                                                <button onClick={()=> { navigate(-1)}} className="btn-classic cancel-btn font-roboto fonts20 fontw700" type="button">Cancel</button>
                                                
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