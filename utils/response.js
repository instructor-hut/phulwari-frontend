import { Fragment } from "react";

export default function Response() {
    return (
        <Fragment>
            <div style={{ zIndex: "100000" }} className="toast-container position-fixed top-0 end-0 p-3">
                <div id="success" className="toast text-white bg-success border-0 text-center" role="alert" data-bs-delay="1500" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="ti ti-circle-check"></i>
                            <span className="ms-1 fw-bolder message-span"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: "100000" }} className="toast-container position-fixed top-0 end-0 p-3">
                <div id="error" className="toast text-white bg-danger border-0 text-center" role="alert" data-bs-delay="1500" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="ti ti-circle-x"></i>
                            <span className="ms-1 fw-bolder message-span"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: "100000" }} className="toast-container position-fixed top-0 end-0 p-3">
                <div id="warning" className="toast text-dark bg-warning border-0 text-center" role="alert" data-bs-delay="1500" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body d-flex align-items-center justify-content-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="ti ti-alert-circle"></i>
                            <span className="ms-1 fw-bolder message-span"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: "100000" }} className="toast-container position-fixed top-0 end-0 p-3">
                <div id="copy" className="toast text-white border-0 text-center" style={{ backgroundColor: "#0c98cd" }} role="alert" data-bs-delay="5000" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body d-flex flex-column text-start">
                        <div className="d-flex justify-content-start mb-2">
                            <span className="fw-bolder message-span"></span> {/* Visible message */}
                            <span className="fw-bolder text-span" style={{ display: "none" }}></span> {/* Hidden text */}
                        </div>
                        <div className="d-flex justify-content-end">
                            <p
                                className="p-0 m-0 align-content-end pointer text-end"
                                onClick={() => copyToClipboard("copy")}
                            >
                                <i className="ti ti-copy"></i>
                                Copy Request No.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export function ToastFunction(type, message, text = "") {
    // Get the correct toast element
    const toastElement = document.querySelector(`#${type}`);

    // If the toast element exists, set the message and text
    if (toastElement) {
        const messageSpan = toastElement.querySelector(".message-span");
        const textSpan = toastElement.querySelector(".text-span");

        // Set message and hidden text
        if (messageSpan) messageSpan.textContent = message;
        if (textSpan) textSpan.textContent = text;

        // Initialize Bootstrap toast and show it
        const responseToast = new bootstrap.Toast(toastElement);
        responseToast.show();
    }
}

// Function to copy the hidden text span’s content to clipboard
export function copyToClipboard(toastId) {
    const text = document.querySelector(`#${toastId} .text-span`).textContent;

    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            // Show success toast after copying
            const CopyToast = new bootstrap.Toast(document.querySelector(`#${toastId}`));
            CopyToast.hide();
            ToastFunction("success", "Request No. copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }
}
