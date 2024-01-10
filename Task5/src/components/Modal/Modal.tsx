import React, {useMemo, RefObject} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  isOpen: boolean;
  onClose(): void;
  anchor: RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, anchor, children}) => {
  const {bottom, right} = useMemo(() => {
    if (!isOpen) {
      return {bottom: 0, right: 0};
    }

    const {bottom, right} = anchor.current.getBoundingClientRect();
    return {bottom, right};
  }, [isOpen]);

  const content = isOpen ? (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={{top: bottom + 10, right: right}}>
        {children}
      </div>
    </div>
  ) : null;
  return ReactDOM.createPortal(content, modalRoot);
};
