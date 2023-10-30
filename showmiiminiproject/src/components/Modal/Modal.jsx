import "./Modal.css"

export default function Modal({ modalheader, modalcontent, modalyesbtnstyle, modalnobtnstyle, openStatus, closeModal, onYes, }){
    if (!openStatus) return null;
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-containerbtns">
                        <p className="hover-as-pointer fontw800" onClick={closeModal}>X</p>
                    </div>
                    <div className="modal-header">
                        <p className="fonts20">{modalheader}</p>
                    </div>
                    <div className="modal-content-container">
                        <p>{modalcontent}</p>
                    </div>
                    <div className="modal-btn-container">
                        <button className={modalyesbtnstyle} onClick={onYes}>Yes</button>
                        <button className={modalnobtnstyle} onClick={closeModal}>No</button>
                    </div>

                </div>
            </div>
        </>
    )
}