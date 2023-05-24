import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {modalRoot} from "../../utils/constaints";


function Modal(props) {
  const {children} = props;


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
        <div className={` ${styles.container}`}>
          <button className={`${styles.close_btn}`} onClick={props.onClose}>
            <CloseIcon type="primary"/>
          </button>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <ModalOverlay onClose={props.onClose}></ModalOverlay>
      </>
    ),
    modalRoot
  );
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
};



export default Modal;