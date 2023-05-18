import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";


function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')
  console.log(props.data)
  return (
    <section>
      <div className={`pb-10 ${styles.tabs}`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.scroll_container} custom-scroll`}>
        <h2 className={`text text_type_main-medium ${styles.subtitle}`}>
          Булки
        </h2>
        <ul className={`${styles.list} pb-10`}>
          {props.data.filter(item => item.type === 'bun').map((ingredient) => (
            <IngredientCard key={ingredient._id} {...ingredient} />
          ))}
        </ul>
        <h2 className={`text text_type_main-medium ${styles.subtitle}`}>
          Соусы
        </h2>
        <ul className={`pb-10 ${styles.list}`}>
          {props.data.filter(item => item.type === 'sauce').map((ingredient) => (
            <IngredientCard key={ingredient._id} {...ingredient} />
          ))}
        </ul>
        <h2 className={`text text_type_main-medium ${styles.subtitle}`}>
          Начинки
        </h2>
        <ul className={`pb-10 ${styles.list}`}>
          {props.data.filter(item => item.type === 'main').map((ingredient) => (
            <IngredientCard key={ingredient._id} {...ingredient} />
          ))}
        </ul>
      </div>
    </section>
  )
}


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
};


export default BurgerIngredients;