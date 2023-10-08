import React, { FC, UIEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "../../services/hooks/useSelector";

import styles from './ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { Preloader } from "../preloader/preloader";
import { ITitlesPosition } from "../../types/main";


export const Ingredients: FC = () => {
  const { data, requestState } = useSelector((store) => store.ingredients);

  const tabsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [containerPosition, setContainerPosition] = useState(0);
  const [titlesPositions, setTitlesPositions] = useState<ITitlesPosition>({});
  const [tab, setTab] = useState('one');


  const handleContainerScroll: UIEventHandler = (evt) => {
    const container = evt.target as HTMLElement | null;
    const tp: ITitlesPosition = {};

    if (!container) {
      return null;
    }

    setContainerPosition(
      container.getBoundingClientRect().top
    );

    container.querySelectorAll('h2').forEach((headingElement, index) => {
      tp[index] = headingElement.getBoundingClientRect().top;
    })
    setTitlesPositions(tp)
  }


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
      buns: (data) ? data.filter(item => item.type === 'bun') : undefined,
      sauces: (data) ? data.filter(item => item.type === 'sauce') : undefined,
      mains: (data) ? data.filter(item => item.type === 'main') : undefined,
    }
  }, [data])


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


  if (requestState.request) return <Preloader/>;


  return (
    <>
      {
        requestState.request
          ? (loadingContent)
          : (
            (requestState.failed)
              ? (<p className="text text_type_main-default text_color_inactive">
                Во время загрузки данных произошла ошибка. Повторите попытку позже.
              </p>)
              : (content)
          )
      }
    </>
  )
}