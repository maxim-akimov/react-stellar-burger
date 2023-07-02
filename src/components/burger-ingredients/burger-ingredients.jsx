import React, {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import styles from './burger-ingredients.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from "../ingredient-card/ingredient-card";

import {getBurgerIngredients} from "../../services/actions/burger-ingredients";


function BurgerIngredients() {
  const {items, ingredientsRequest, ingredientsFailed} = useSelector(state => state.burgerIngredients);


  const dispatch = useDispatch();
  const tabsRef = useRef();
  const scrollContainerRef = useRef();

  const [containerPosition, setContainerPosition] = useState(0);
  const [titlesPositions, setTitlesPositions] = useState({});
  const [tab, setTab] = useState('one');


  function handleContainerScroll(evt) {
    const container = evt.target;
    const tp = {};

    setContainerPosition(
      container.getBoundingClientRect().top
    );

    container.querySelectorAll('h2').forEach((title, index) => {
      tp[index] = title.getBoundingClientRect().top;
    })
    setTitlesPositions(tp)
  }


  useEffect(() => {
    dispatch(
      getBurgerIngredients()
    );
  }, []);


  useEffect(() => {
    const tabsNames = ['one', 'two', 'three'];
    const results = [];

    for (const titleIndex in titlesPositions) {
      results.push(
        Math.abs(containerPosition - titlesPositions[titleIndex])
      );
    }

    const currentTitle = tabsNames[results.indexOf(
      Math.min.apply(null, results)
    )];

    if (currentTitle && currentTitle !== tab) {
      setTab(currentTitle);
    }
  }, [titlesPositions])


  const ingredients = useMemo(() => {
    return {
      buns: (items) ? items.filter(item => item.type === 'bun') : undefined,
      sauces: (items) ? items.filter(item => item.type === 'sauce') : undefined,
      mains: (items) ? items.filter(item => item.type === 'main') : undefined,
    }
  }, [items])


  const loadingContent = <p className="text text_type_main-default text_color_inactive">Загрузка...</p>;

  const content = <section>
    <div className={`pb-10 ${styles.tabs}`} ref={tabsRef}>
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
    <div className={`${styles.scroll_container} custom-scroll`} ref={scrollContainerRef}
         onScroll={handleContainerScroll}>
      <h2 className="text text_type_main-medium" id="one">
        Булки
      </h2>
      <ul className={`${styles.list} pb-10`}>
        {ingredients.buns && ingredients.buns.map((ingredient) => (
          <IngredientCard key={ingredient._id} {...ingredient} />
        ))}
      </ul>
      <h2 className="text text_type_main-medium" id="two">
        Соусы
      </h2>
      <ul className={`pb-10 ${styles.list}`}>
        {ingredients.sauces && ingredients.sauces.map((ingredient) => (
          <IngredientCard key={ingredient._id} {...ingredient} />
        ))}
      </ul>
      <h2 className="text text_type_main-medium" id="three">
        Начинки
      </h2>
      <ul className={`pb-10 ${styles.list}`}>
        {ingredients.mains && ingredients.mains.map((ingredient) => (
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