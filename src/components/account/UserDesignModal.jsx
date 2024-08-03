import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  // Render the modal using React Portal
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
