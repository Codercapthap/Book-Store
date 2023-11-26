import React from "react";
import { createPortal } from "react-dom";

function Modal({ children, isOpen, handleClose }) {
  if (!isOpen) return null;
  return createPortal(
    <div
      className="bg-black bg-opacity-30 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-10"
      onClick={(e) => {
        if (e.target === e.currentTarget && handleClose) {
          handleClose();
        }
      }}
    >
      {children}
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
