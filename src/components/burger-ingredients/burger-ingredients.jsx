import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import styles from './burger-ingredients.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from "../ingredient-card/ingredient-card";
import {getBurgerIngredients} from "../../services/actions/burger-ingredients";


function BurgerIngredients() {
  const {items, ingredientsRequest, ingredientsFailed} = useSelector(state => state.burgerIngredients);
  console.log(items)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBurgerIngredients()
    );
  }, []);


  const [tab, setTab] = React.useState('one');


  const bun = (items) ? items.filter(item => item.type === 'bun') : undefined;
  const sauce = (items) ? items.filter(item => item.type === 'sauce') : undefined;
  const main = (items) ? items.filter(item => item.type === 'main') : undefined;

  const loadingContent = <p className="text text_type_main-default text_color_inactive">Загрузка...</p>;

  const content = <section>
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
        {bun && bun.map((ingredient) => (
          <IngredientCard key={ingredient._id} {...ingredient} />
        ))}
      </ul>
      <h2 className="text text_type_main-medium">
        Соусы
      </h2>
      <ul className={`pb-10 ${styles.list}`}>
        {sauce && sauce.map((ingredient) => (
          <IngredientCard key={ingredient._id} {...ingredient} />
        ))}
      </ul>
      <h2 className="text text_type_main-medium">
        Начинки
      </h2>
      <ul className={`pb-10 ${styles.list}`}>
        {main && main.map((ingredient) => (
          <IngredientCard key={ingredient._id} {...ingredient} />
        ))}
      </ul>
    </div>
  </section>;

  return (
    <>
      {
        ingredientsRequest
          ? (loadingContent)
          : (
            (ingredientsFailed)
              ? (<p className="text text_type_main-default text_color_inactive">
                Во время загрузки данных произошла ошибка. Повторите попытку позже.
              </p>)
              : (content)
          )
      }
    </>
  )
}


export default BurgerIngredients;