import styles from './ingredient-icon.module.css'
import React from "react";
import PropTypes from "prop-types";

function IngredientIcon({src, alt, more}) {

  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.image} />
      {(more && more > 0 && <div className={`text text_type_digits-default ${styles.more}`}>+{more}</div>)}
    </div>
  );
}


IngredientIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  more: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};


export default IngredientIcon;