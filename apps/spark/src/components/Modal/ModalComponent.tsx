import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface Props {
  isShowing: boolean;
  hide: MouseEventHandler;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background: #0b0b0b;
  opacity: 0.8;
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;
const Modal = styled.div`
  z-index: 100;
  margin: 0 auto;
  text-align: left;
  width: 100%;
  max-width: 700px;
  position: relative;
  transform: translateY(-50%);
  top: 50%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  > button {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    opacity: 0.3;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 44px;
    height: 44px;
  }
`;

const ModalComponent: React.FC<Props> = ({ isShowing, hide, children }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalOverlay />
          <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
            <Modal>
              <ModalHeader>
                <button type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </ModalHeader>
              {children}
            </Modal>
          </ModalWrapper>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalComponent;
