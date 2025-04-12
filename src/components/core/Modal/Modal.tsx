import React, { useEffect } from "react";
import { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import { Button } from "../Button/Button";

// Modal Component
export const Modal: React.FC<ModalProps> = (
    { isOpen, onClose, title, children }
) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }

    // Clean up the overflow style on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-labelledby="modal-title" aria-hidden={!isOpen}>
      <div
        role="presentation"
        className={styles.modalOverlay}
        onClick={onClose}>
                  <div
        className={styles.modal}>
        <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
        <div className={styles.cancelBtnContainer}>
            <Button
              className="cancel"
              type="icon"
              onClick={onClose}
              ariaLabel="Close modal"
              icon={{
                url: "/icons/22px/icon-cancel.svg",
                width: 16,
                height: 16,
                position: "right",
              }} />
        </div>
        <div className={styles.modalContent}>
              {children}
        </div>
      </div>
        </div>

    </div>
  );
};
