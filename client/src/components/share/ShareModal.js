import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShareModal({ modalVisible, shareData, handleClose }) {
  const handleCopy = () => {
    toast.success("Copied to clipboard", {
      autoClose: 3000,
    });
  };

  return (
    <>
      <div className={`${"share-modal"} ${modalVisible ? "opened" : "closed"}`}>
        <section className="modal-header">
          <h3 className="modal-title">Share Via</h3>
          <button className="close-button" onClick={() => handleClose(false)}>
            &times;
          </button>
        </section>
        <section className="modal-body">
          <div className="row">
            <div>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://conquerthecrown.surge.sh/"
                >
                  Facebook
                </a>
              </button>
            </div>
            <div>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/intent/tweet?url=https://conquerthecrown.surge.sh/"
                >
                  Twitter
                </a>
              </button>
            </div>
          </div>

          <div className="row">
            <div>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/intent/tweet?url=https://conquerthecrown.surge.sh/"
                >
                  LinkedIn
                </a>
              </button>
            </div>
            <div>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={
                    "mailto:info@example.com?&subject=&cc=&bcc=&body=https://conquerthecrown.surge.sh/%0A"
                  }
                >
                  Email
                </a>
              </button>
            </div>
          </div>
        </section>
        <section className="modal-footer">
          <div className="modal-footer-link">
            https://conquerthecrown.surge.sh
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("https://conquerthecrown.surge.sh");
              handleCopy();
            }}
            className="modal-footer-button"
          >
            Copy Link
          </button>
        </section>
      </div>
    </>
  );
}

export default ShareModal;
