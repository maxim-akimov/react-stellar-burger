import React, { FC, useMemo } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './ingredient-card.module.css';


import { IIngredient } from "../../types/data";
import { setIngredientDetailsAction } from "../../services/actions/ingredient-details";
import { addIngredientAction } from "../../services/actions/constructor";


export const IngredientCard: FC<IIngredient> = (props) => {
  const { _id, type, image, price, name } = props;

  const location = useLocation();
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: props
  });

  const { bun, other } = useSelector(state => state.burgerConstructor);


  const quantity = useMemo(() => {
    return (type === 'bun' && bun && bun._id === _id)
      ? 1
      : other.reduce((counter: number, item: IIngredient) => {
        return (item._id === _id) ? counter + 1 : counter;
      }, 0);
  }, [bun, other])


  const handleOpenModal = () => {
    dispatch(setIngredientDetailsAction(props))
  }


  return (
    <li className={styles.card} onClick={() => handleOpenModal()} ref={dragRef}>
      <Link
        key={_id}
        to={`/ingredients/${_id}`}
        state={{ background: location }}
        className={styles.link}
      >
        <img src={image} alt="props.name"/>
        <div className={styles.price}>
          {price}
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>
          {name}
        </p>
        {quantity > 0 && <Counter count={quantity} size="default" extraClass="m-1"/>}
      </Link>
    </li>
  )
}