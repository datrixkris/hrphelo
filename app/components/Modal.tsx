"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface ModalProps {
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
      className={`modal-backdrop fixed z-50 top-0 left-0 size-full bg-black/50 flex justify-center items-center transition-opacity opacity-0 invisible ${
        isOpen ? "!opacity-100 !visible" : "!opacity-0 !invisible"
      }`}
      onClick={clickOutside ? handleBackdropClick : () => {}}
    >
      <div
        className={`modal-content p-5 bg-base-100 rounded border border-base-300 max-h-[90vh] overflow-y-auto text-base-content relative transition-transform -translate-y-7 ${
          isOpen ? "!translate-y-0" : "!-translate-y-7"
        }`}
      >
        {/* <button className="modal-close absolute top-3 right-3 bg-trans" onClick={onClose}>
          ✕
        </button> */}
        <Icon
          icon="heroicons:x-circle"
          className="modal-close absolute top-2 right-2 text-base-content cursor-pointer text-xl"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
