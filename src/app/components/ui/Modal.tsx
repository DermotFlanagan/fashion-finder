import { X } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Modal;
