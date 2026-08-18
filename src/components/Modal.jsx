import { createPortal } from "react-dom"

export default function Modal({
    title, content, show, onClose, onConfirm, confirmText = "Confirm", showCancel = true
}) {
    return show && createPortal(
        <>
            <div className="modal-backdrop fade show"></div>
            <div
                className={`modal fade ${show ? "show" : ""}`}
                style={{ display: show ? "block" : "none" }}
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            {showCancel &&
                                <button type="button" className="btn btn-outline-primary" onClick={onClose}>Cancel</button>
                            }
                            <button type="button" className="btn btn-primary" onClick={onConfirm}>{confirmText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body

    )

} 