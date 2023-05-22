import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";


function ModalOverlay(props) {
  const {onClose, children} = props;


  return (
    <div className={styles.overlay} onClick={onClose}>
      {children}
    </div>
  )
}


ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
};


export default ModalOverlay;