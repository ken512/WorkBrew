"use client";
import React,{ReactNode} from "react";
import ReactModal from "react-modal";

type Props = {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div>
        <button onClick={onClose}>{children}</button>
      </div>
    </ReactModal>
  );
};
