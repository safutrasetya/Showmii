import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"

import "./Explore.css"
import { useEffect, useState } from "react"
// import axios from "axios"
// import { baseUrl } from "../../api/axios"
import { Link } from "react-router-dom"
import { getDatabase, ref, onValue } from "firebase/database"
import { db } from "../../config/firebase"

export default function Explore(){
    const [mappedPosts, setMappedPosts] = useState([])

    function getAllPosts(){
        const refthedb = ref(db, '/imageposts/')
        onValue(refthedb, (snapshot) => {
            console.log(snapshot.val())
            const getdata = snapshot.val()

            const postinarray = Object.keys(getdata).map(key=>({
                id:key,
                ...getdata[key]
            }))  //CATAT  INI INI PENTING DIINGAT
            console.log(postinarray)
            setMappedPosts(postinarray)
        }, {onlyOnce: true});
    }

    useEffect(()=>{
        getAllPosts()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container1 background-blue">
                <div className="page-title">
                    <p className="fontw800 fonts36">Explore</p>
                </div>
                <div className="images-container">
                    {
                        mappedPosts ? 
                        mappedPosts.map((items)=>{
                            const theurl = "/detailimage/"+items.id
                            return(
                            <>
                                <Link to={theurl} className="explore-img-nostyle">
                                    <div className="image-container">
                                        <img src={items.imageurl} className="img-bg rounded-top-5" alt="imgname"/>
                                        <p className="fonts24 fontw500 word">{items.imagename}</p>
                                        <p className="fonts16 word">By {items.imageposter}</p>
                                    </div>
                                </Link>
                            </>
                            )
                        })
                        :
                        <>
                            <div className="image-container">
                                <p className="fonts16">By Someone</p>
                            </div>
                        </>
                    }

                </div>
            </div>
            <Footer/>
        </>
    )
}