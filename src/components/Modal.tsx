import type React from "react";
import type { ModalProps } from "../types";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="max-w-[350px] bg-white p-6 rounded-md shadow-md relative mx-4">
        {children}
      </div>
    </div>
  );
};

export default Modal;
