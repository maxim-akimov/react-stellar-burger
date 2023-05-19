import React from "react";
import styles from './modal-overlay.module.css';
import Modal from "../modal/modal";


function ModalOverlay() {
  const [state, setState] = React.useState({
    isOpened: true
  });

  return (
    state.isOpened &&
    <div className={styles.overlay}>
      <Modal />
    </div>
  )
}


export default ModalOverlay;