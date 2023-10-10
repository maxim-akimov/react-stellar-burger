// Библиотеки
import React, { FC } from "react";

// Стили
import styles from './modal-overlay.module.css';


interface IModalOverlayProps {
  onClose: () => void
}


export const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  const { onClose } = props;

  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

