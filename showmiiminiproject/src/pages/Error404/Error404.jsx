import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";


export default function Error404(){
    return (
        <>
            <Navbar />
            <div className="container1 background-blue">
                <div className="page-title">
                    <p className="fontw800 fonts36">Error 404: Image Not Found</p>
                </div>
            </div>
            <Footer/>
        </>
    )
}