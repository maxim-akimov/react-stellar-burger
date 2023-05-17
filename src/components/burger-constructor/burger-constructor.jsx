import React from "react";
import styles from './burger-constructor.module.css';
import {data} from '../../utils/data';
import IngredientCard from "../ingredient-card/ingredient-card";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerConstructor() {
  return (
    <section className={styles.list}>
        <ConstructorElement
          key={data[0]._id}
          type="top"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
        <ul className={`pb-10 ${styles.scroll_container} ${styles.list} custom-scroll`}>
          {data.map((ingredient, i, arr) => (
            <ConstructorElement
              key={ingredient._id}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          ))}
        </ul>
        <ConstructorElement
          key={data[0]._id}
          type="bottom"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
    </section>
  )
}


export default BurgerConstructor;