import "./Footer.css"
// import "../../essentialcss/essentialcss.css"

export default function Footer(){


    return (
        <>
            <div className="footercontainer">
                <div className="copyright">
                    <p className="fontw500">Copyright Show  mii 2023</p>
                </div>
                <div className="privacy-policy">
                    <p className="fontw500">View our 
                    <span><a className="linkies"> Terms of Service </a></span> and 
                    <span><a className="linkies"> Privacy Policy</a></span></p>
                </div>
            </div>

        </>
    )
}