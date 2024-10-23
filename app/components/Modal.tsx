"use client";

import React from "react";
import { Icon } from "@iconify/react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clickOutside?: boolean;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  clickOutside = false,
}: ModalProps) => {
  // Close the modal when clicking outside the modal content
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`modal-backdrop invisible fixed left-0 top-0 z-50 flex size-full items-center justify-center overflow-y-auto bg-black/50 opacity-0 transition-opacity ${
        isOpen ? "!visible !opacity-100" : "!invisible !opacity-0"
      }`}
      onClick={clickOutside ? handleBackdropClick : () => {}}
    >
      <div className="h-full overflow-y-auto p-5">
        <div
          className={`modal-content relative -translate-y-7 rounded border border-base-300 bg-base-100 p-5 text-base-content transition-transform ${
            isOpen ? "!translate-y-0" : "!-translate-y-7"
          }`}
        >
          <Icon
            icon="heroicons:x-circle"
            className="modal-close absolute right-2 top-2 cursor-pointer text-3xl text-base-content"
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
