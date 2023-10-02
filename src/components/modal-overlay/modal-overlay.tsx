import React, { FC } from "react";

import styles from './modal-overlay.module.css';


interface IModalOverlay {
  onClose: () => void
}


export const ModalOverlay: FC<IModalOverlay> = (props) => {
  const { onClose } = props;

  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

