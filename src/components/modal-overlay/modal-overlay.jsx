import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";


function ModalOverlay(props) {
  const {onClose} = props;


  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}


ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any
};


export default ModalOverlay;