import { useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./FAQ.css"
import OpenAI  from "openai";
import { ThreeDots } from  'react-loader-spinner'
import { aiQNA } from "../../haddata/QNA";



export default function FAQ(){
    const [prompt, setPrompt] = useState("")
    const [outputResult, setOutputResult] = useState([])
    const [loading, setLoading] = useState(false)

    const conf = {
        apiKey : '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',
        dangerouslyAllowBrowser: true
    };
    const openai = new OpenAI(conf);


    function handlePrompt(e){
        setPrompt(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()

        console.log(prompt)
        setLoading(true)
        var res = {}
        res = await openai.chat.completions.create({
            messages: [{ role: "system", content: aiQNA },{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        })
        setOutputResult(res.choices)
        setLoading(false)
        console.log("result : ", res.choices)
    }

    return(
        <>
            <Navbar/>
                <div className="background-blue minimum-bg-height">
                    <div className="main-container">
                        <div className="page-title">
                            <p className="fontw800 fonts36">Frequently Asked Questions (FAQ)</p>"
                        </div>
                        <div className="page-content">
                            <p className="fonts24 fontw700">Q : What is Showmii?</p>
                            <p className="fonts20">A : Showmii is a platform for sharing images with others freely.</p>

                            <br></br>
                            <p className="fonts24 fontw700">Q : How does showmii work?</p>
                            <p className="fonts20">A : Simple! First you have to register as anew user. If you already did, you can then login, and then you can start clicking at the Upload button on the left of "Hello" on top right of the page.
                            You pick an image from your computer, add the name fo your image and add some descriptions, and voila! Your image is shared!</p>

                            <br></br>
                            <p className="fonts24 fontw700">Q : Do you use cookies?</p>
                            <p className="fonts20">A : Currently not, but possibly in the future!</p>

                            <br></br>
                            <p className="fonts24 fontw700">Doesnt find what you were looking for? Ask our new AI!</p>
                            <form className="faq-form-div" onSubmit={handleSubmit}>
                                <input onChange={handlePrompt} type="text" className="input-text fonts20" placeholder="eg : What is this website?"></input>
                                <button type="submit" className="btn-classic purple-btn fonts20 ms-4">Ask</button>
                            </form>
                            <div className="ai-container">
                                <div className="ai-p">
                                    <p className="fonts20">AI: </p>
                                </div>
                                {
                                    loading ? 
                                    <ThreeDots 
                                    height="30" 
                                    width="30" 
                                    radius="9"
                                    color="#FFF" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{marginLeft: "10px"}}
                                    wrapperClassName=""
                                    visible={true}
                                    /> : 
                                    <div>
                                        {
                                        
                                            outputResult.length > 0  ?
                                                outputResult.map((item, index) => {
                                                    return(
                                                        <>
                                                            <div className="ai-answer">
                                                                <p key={index} className="fonts20">{item.message.content}</p>  
                                                            </div>
                                                        </>
                                                    )
                                                }) 
                                            :
                                            <></>
                                        
                                        
                                        }

                                            
                                            
                                            
                                            
                                    </div>
                                }
                        </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}