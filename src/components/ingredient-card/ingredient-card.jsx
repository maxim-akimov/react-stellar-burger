import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';


function IngredientCard(props) {
    return (
      <li className={styles.card}>
        <img src={props.image} alt="props.name"/>
        <div className={styles.price}>
            {props.price}
            <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>
            {props.name}
        </p>
      </li>
    )
}


export default IngredientCard;