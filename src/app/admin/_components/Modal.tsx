"use client";
import React, { ReactNode } from "react";
import ReactModal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;

  // 任意：content / overlay を呼び出し側で自由に上書きできる
  className?: string;
  overlayClassName?: string;

  // 任意：アクセシビリティ用
  contentLabel?: string;

  // 任意：閉じるボタン/ヘッダーが欲しい場合だけ使う
  title?: string;
  showCloseButton?: boolean;
};

const defaultContentClass = `
  fixed left-1/2 top-1/2 z-[70]
  w-[92vw] max-w-md
  -translate-x-1/2 -translate-y-1/2
  rounded-2xl bg-white p-6
  shadow-2xl ring-1 ring-black/5
  focus:outline-none
`;

const defaultOverlayClass = `
  fixed inset-0 z-[60]
  bg-black/50 backdrop-blur-sm
  flex items-center justify-center px-4
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  contentLabel = "Modal",
  title,
  showCloseButton = false,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel={contentLabel}
      className={className ?? defaultContentClass}
      overlayClassName={overlayClassName ?? defaultOverlayClass}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {/* 汎用性を壊さない：ここで children を button で包まない */}
      <div className="space-y-4">
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-3">
            {title ? (
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900">
                {title}
              </h2>
            ) : (
              <span />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-full
                  text-gray-500 hover:bg-gray-100 hover:text-gray-700
                  transition
                "
                aria-label="閉じる"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </ReactModal>
  );
};
