import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./DetailImage.css"
import { ref, onValue, update } from "firebase/database"
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { db } from "../../config/firebase"
import DeleteImageFromStorage from "../../components/DeleteImageFunc/DeleteImageFunc";



export default function DetailImage(){
    const {imageid} = useParams()
    const [imageData, setImageData] = useState({})
    const [imageOwner, setImageOwner] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [alert, setAlert] = useState({
        m: "",
        style: {
            backgroundColor: "#ff7575",
            color: "white",
            transition: "0.5s",
            padding: "5px 15px",
            borderRadius: "30px",
            alignItems: "center",
            display: "flex",
            textShadow: "none"
        }
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(imageid){
            
        }
        getImageData()
    }, [])

    function getImageData(){
        const userlog = JSON.parse(localStorage.getItem('showmiiuser'));
        const refthedb = ref(db, '/imageposts/'+imageid)
        onValue(refthedb, (snapshot) => {
            console.log(snapshot.val())
            setImageData(snapshot.val())
            if(snapshot.val() == null){
                navigate("/err404")
            }

            if(snapshot.val().imageposter == userlog.username){
                setImageOwner(true)
            }
        }, {onlyOnce: true})
    }

    function deleteImageData(){
        setOpenModal(false)
        setLoading(true)
        const updates = {}
        updates['imageposts/' + imageid] = null
        update(ref(db), updates).then(()=>{
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
            console.log(e)
            setAlert({
                ...alert, m: "Something is wrong while deleting image....",
                style : {...alert.style, backgroundColor: "#ff7575"}
            })
            setLoading(false)
        });

    }
    function handleDelete(e){
        setOpenModal(true)
    }

    return  (
        <>  
            <Modal 
                modalheader={"Delete image"}
                modalcontent={"Are you sure you want to delete this image?"}
                modalyesbtnstyle={"btn-classic red-btn me-4 fontw700"}
                modalnobtnstyle={"btn-classic blue-btn fontw700"}
                openStatus={openModal} 
                onYes={deleteImageData} 
                closeModal={()=> setOpenModal(false)}
            />
            <Navbar/>
                
                <div className="detailimage-container background-blue">
                    <div className="image-show-maindiv">
                        <img src={imageData.imageurl} className="image-main" />
                    </div>
                    <div className="detail-div">
                        <div className="sub-detail-div">
                            <div className="image-detail-div">
                                <div className="image-detail-header-div">
                                    <div className="div-for-p-flex image-detail-align-to-mid">
                                        <p className="fontw800 fonts36 me-3">{imageData.imagename}</p>
                                        {
                                            alert.m ? 
                                            <p style={alert.style}>
                                                {alert.m}
                                            </p> :

                                            loading?
                                            <p className="p-loading">Processing....</p>:
                                            <></>
                                        }
                                    
                                    </div>
                                    <div>
                                        <Link to="/explore" className="link-no-decor-black me-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                            </svg>
                                        </Link>

                                        {
                                            imageOwner ? 
                                                <div className="btn-group dropdown">
                                                    <svg className="hover-as-pointer bi bi-three-dots-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                    </svg>
                                                    <ul className="dropdown-menu dropdown-menu-end mt-2">
                                                        <li><Link to={"/editimageinfo/"+imageid} className="dropdown-item">Edit</Link></li>
                                                        <li><a onClick={handleDelete} className="hover-as-pointer dropdown-item text-danger">Delete</a></li>
                                                    </ul>
                                                </div>
                                                :
                                                <></>

                                        }
                                    </div>
                                </div>


                            </div>
                            <div className="image-detail-div">
                                <p className="fontw500 fonts32">By {imageData.imageposter}</p>
                            </div>
                            <div className="image-detail-div">
                                <p className="fontw500 fonts24">{imageData.imagedesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            <Footer/>
        </>
    )
}