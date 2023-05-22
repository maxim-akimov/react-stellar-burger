import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";


function Modal(props) {
  const modalRoot = document.getElementById('modal-root');


  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, []);


  const handleEsc = (evt) => {
    if (evt.key === 'Escape') {
      props.onClose();
    }
  }


  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={props.onClose}>
          <div className={` ${styles.container}`}>
            <button className={`${styles.close_btn}`} onClick={props.onClose}>
              <CloseIcon type="primary"/>
            </button>
            <div className={styles.content}>
              {props.children}
            </div>
          </div>
        </ModalOverlay>
      </>
    ),
    modalRoot
  );
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};



export default Modal;