import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./UploadImage.css"
import "../../essentialcss/essentialcss.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase"
import { ref as refToDB, set, child, get } from "firebase/database"
import { db, auth } from "../../config/firebase"


export default function UploadImage(){
    const [formInput, setFormInput] = useState({
        imgname : "",
        imgdesc : ""
    })
    const [fileInput, setFileInput] = useState({
        fileuploaded : null,
        filebase64format : ""
    })
    const [progress, setProgress] = useState(0)
    const [alert, setAlert] = useState({
        m: "",
        alertstyle : {
            backgroundColor: "#ff7575",
            color: "white",
            transition: "0.5s",
            padding: "5px 15px",
            borderRadius: "30px",
        }
    })
    const [finished, setFinished] = useState({
        status : false,
        link : "/"
    })


    useEffect(() => {
        console.log("From use effect filenput : " , fileInput)
        console.log("From use effect forminput : " ,formInput)
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
        console.log("from handle fileinput",fileInput)
        setFileInput({...fileInput, fileuploaded: e.target.files[0]})
        //set img yang akan ditampilkan jadi hasil fungsi getBase64 ini (isinya itu data url atau string)
        getBase64(e.target.files[0]).then(result => {
            setFileInput({...fileInput , fileuploaded: e.target.files[0], filebase64format: result})
        })
        console.log("from handle fileinput",fileInput)
    }

    function uploadToDB(imageuid, imagealldata, imagelink){
        const userlog = JSON.parse(localStorage.getItem("showmiiuser"))
        set(refToDB(db, 'imageposts/' + imageuid), {
            imagename: imagealldata.imgname,
            imageurl: imagelink,
            imagedesc: imagealldata.imgdesc,
            imageposter: userlog.username
        }).then(()=>{
            setAlert({
                ...alert, m: "Successfully uploaded!",
                alertstyle : {...alert.alertstyle, backgroundColor: "#4d8553"}
            })
            setFinished({status : true, link: "/detailimage/"+imageuid})
        }).catch((e)=>{
            console.log(e)
        });

    }

    function uploadFile(){

        if(fileInput.fileuploaded){
            const timestamp = new Date().getTime()
            const randomchar = Math.random().toString(36).substring(2, 10)
            const uniquename = timestamp+"-"+randomchar+"-"+formInput.imgname
            setAlert({
                ...alert, m: "Uploading file...",
                alertstyle : {...alert.alertstyle, backgroundColor: "#2471c9"}
            })

            console.log("Uploading this image : ", fileInput.fileuploaded)
            const storageRef = ref(storage, `imagesuploaded/${uniquename}`) // ini guna meng-set direktori tujuan di firebase. tapi harus masukin FULL sampai ke nama file
            const uploadFile = uploadBytesResumable(storageRef, fileInput.fileuploaded)
        
            uploadFile.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(percent)
                    console.log(percent)
                },
                (er) => {
                    console.log('Ada error pas upload ', er);
                    alert('There is an error while uplaoding the file.')
                    setAlert({
                        ...alert, m: "There is an error while uplaoding the file.",
                        alertstyle : {...alert.alertstyle, backgroundColor: "#ff7575"}
                    })
                },
                () => {
                    // download url
                    getDownloadURL(uploadFile.snapshot.ref).then((url) => {
                        console.log('success downloading ', url);
                        const userlog = JSON.parse(localStorage.getItem("showmiiuser"))
                        const newdata = {...formInput, usersId : userlog.id, imageurl: url}
                        setAlert({
                            ...alert, m: "Finishing...!",
                            alertstyle : {...alert.alertstyle, backgroundColor: "#2471c9"}
                        })
                        uploadToDB(uniquename,formInput,url) // upload to realtimedb


                        console.log(formInput)
                    });
                }
            )
        
        
        }else{
            setAlert({
                ...alert, m: "You need to choose an image to uplaod.",
                alertstyle : {...alert.alertstyle, backgroundColor: "#ff7575"}
            })
        }
    }

    function cekDB(){
        const timestamp = new Date().getTime()
        const randomchar = Math.random().toString(36).substring(2, 10)
        const imageid = timestamp+"-" +randomchar+"-"+formInput.imgname
        const dbRef = refToDB(db);
        get(child(dbRef, `imageposts/${imageid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setAlert({...alert, m: "There is an image with the same name already", alertstyle: {...alert.alertstyle, backgroundColor: "#ff7575"}})
            } else {

                uploadFile()//upload ke Storage dulu. didalam sini jugalah dia dimasukkan ke database

                console.log("No data available we can put it inside");

            }
        }).catch((error) => {
            console.error(error);
        });


    }
  
    function handleSubmit(e){
        e.preventDefault()
        const pattern = /["/\\]/
        // validation
        if(formInput.imgname == ""){
            setAlert({
                ...alert, m: "Specify the image name!",
                alertstyle : {...alert.alertstyle, backgroundColor: "#ff7575"}
            })
        }else if(pattern.test(formInput.imgname)){
            setAlert({
                ...alert, m: 'Image name should not have " / \\ symbols',
                alertstyle : {...alert.alertstyle, backgroundColor: "#ff7575"}
            })
        }else{
            cekDB()
        }

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
                                    {
                                        alert.m ? 
                                        <p style={alert.alertstyle}>
                                            {alert.m}
                                            {
                                                alert.m == "Uploading file..." ?
                                                <span>{progress}%</span> :
                                                <></>
                                            }
                                        </p> :
                                        <></>
                                    }
                                    <div className="uploadimg-form-part-final">
                                        {
                                            finished.status ? 
                                            <Link className="removemargin" to={finished.link}>
                                                <button className="btn-classic btn-darkblue text-white font-roboto fonts20 fontw700 cek-btn" type="button">Check</button>
                                            </Link>
                                            :
                                            <></>
                                        }
                                        <Link className="removemargin" to="/explore">
                                            <button className="cancel-btn font-roboto btn-classic fonts20 fontw700" type="button">Cancel</button>
                                        </Link>
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