import React from "react";
import styles from './ingredient-details.module.css';


function IngredientDetails(props) {
  return (
    <>
      <h2 className={`pt-10 pr-10 pl-10 text text_type_main-large ${styles.heading}`}>
        Детали ингредиента
      </h2>
      <img src={props.data.image_large} alt={props.data.name} className={styles.image} />
      <p className={`pt-4 pb-8 text text_type_main-medium`}>{props.data.name}</p>
      <ul className={`pb-15 text_color_inactive ${styles.energy}`}>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Калории, ккал
          </p>
          <p className="text text_type_digits-default">
            {props.data.calories}
          </p>
        </li>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Белки, г
          </p>
          <p className="text text_type_digits-default">
            {props.data.proteins}
          </p>
        </li>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Жиры, г
          </p>
          <p className="text text_type_digits-default">
            {props.data.fat}
          </p>
        </li>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Углеводы, г
          </p>
          <p className="text text_type_digits-default">
            {props.data.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  )
}


export default IngredientDetails;