import React, { useEffect, useRef } from 'react';
import { ModalProps } from './Modal.types';
import styles from './Modal.module.scss';
import { Button } from '@/components/core/Button/Button';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable background scroll & focus the close button
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
      className={styles.modalWrapper}
    >
      <div
        role="presentation"
        className={styles.modalOverlay}
        onClick={onClose}
      >
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          ref={modalRef}
        >
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
              }}
              ref={closeButtonRef}
            />
          </div>

          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
