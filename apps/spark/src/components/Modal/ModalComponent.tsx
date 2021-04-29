import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

interface Props {
  isShowing: boolean;
  hide: MouseEventHandler;
}

const ModalComponent: React.FC<Props> = ({ isShowing, hide, children }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalComponent;
