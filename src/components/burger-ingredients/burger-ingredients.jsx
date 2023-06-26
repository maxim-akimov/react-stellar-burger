import React, {useContext} from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import {DataContext} from "../../services/app-context";



function BurgerIngredients(props) {
  const data = useContext(DataContext);


  const [tab, setTab] = React.useState('one');


  const bun = data.filter(item => item.type === 'bun');
  const sauce = data.filter(item => item.type === 'sauce');
  const main = data.filter(item => item.type === 'main');



  return (
    <section>
      <div className={`pb-10 ${styles.tabs}`}>
        <Tab value="one" active={tab === 'one'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="two" active={tab === 'two'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="three" active={tab === 'three'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.scroll_container} custom-scroll`}>
        <h2 className="text text_type_main-medium">
          Булки
        </h2>
        <ul className={`${styles.list} pb-10`}>
          {bun.map((ingredient) => (
            <IngredientCard key={ingredient._id} {...ingredient} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">
          Соусы
        </h2>
        <ul className={`pb-10 ${styles.list}`}>
          {sauce.map((ingredient) => (
            <IngredientCard key={ingredient._id} {...ingredient} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">
          Начинки
        </h2>
        <ul className={`pb-10 ${styles.list}`}>
          {main.map((ingredient) => (
            <IngredientCard key={ingredient._id} {...ingredient} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/*
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};
 */


export default BurgerIngredients;