import styles from './ingredient-icon.module.css'
import React from "react";

function IngredientIcon({src, alt}) {


  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
}

export default IngredientIcon;