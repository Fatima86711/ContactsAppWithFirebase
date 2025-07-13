import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur">
            <div className="relative z-50 mx-auto min-h-[200px] max-w-[80%] rounded-xl bg-white p-4 backdrop-blur">
              <div className="flex justify-end">
                <AiOutlineClose onClick={onClose} className="" />
              </div>
              {children}
            </div>
            {/* top-0 right-0 bottom-0 left-0 */}
          </div>
        </>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
