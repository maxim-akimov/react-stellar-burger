import React, { FC, useEffect } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useParams } from "react-router-dom";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { Preloader } from "../preloader/preloader";

import styles from './order-details.module.css'

import { IIngredient } from "../../types/data";
import { getOrderDetailsThunk } from "../../services/thunks/order-details";

export const OrderDetails: FC = () => {
  const { orderNumber } = useParams();

  const dispatch = useDispatch();

  const { data, requestState } = useSelector((store) => store.orderDetails);
  const ingredients = useSelector((state) => state.ingredients.data);

  const od = useSelector((store) => store.orderDetails);


  useEffect(() => {
    dispatch(getOrderDetailsThunk(orderNumber))
  }, [])

  if (requestState.request) return <Preloader type={'modal'}/>;
  if (!data) return null;

  //todo reduce
  const quantity: {
    [key: string]: number
  } = {};

  data.ingredients.forEach((ingredientId: string) => {
    (quantity[ingredientId]) ? quantity[ingredientId] += 1 : quantity[ingredientId] = 1;
  })

//TODO reduce
  const orderIngredients = ingredients.filter((ingredient: IIngredient) => {
    return data.ingredients.some((ingredientId: string) => {
      return ingredientId === ingredient._id;
    })
  });


  const total = orderIngredients.reduce((sum: number, current: IIngredient) => {
    return sum + current.price;
  }, 0)


  const statuses: {
    [key: string]: string
  } = {
    created: 'Новый',
    pending: 'Готовится',
    done: 'Выполнен'
  };


  return (
    <section className={`pt-30 pb-15 ${styles.container}`}>
      <p className={`text text_type_digits-default pb-10 ${styles.number}`}>{data.number}</p>
      <h1 className={`text text_type_main-medium pb-3${styles.title}`}>{data.name}</h1>
      <p
        className={`text text_type_main-default pb-15 ${styles.status} ${(data.status === 'done' ? styles.status_done : '')}`}>{statuses[data.status]}</p>
      <h2 className={`text text_type_main-medium pb-6 ${styles.title}`}>Состав:</h2>
      <ul className={`${styles.list} custom-scroll`}>
        {ingredients.map((ingredient: IIngredient) => (
          <li key={ingredient._id} className={`${styles.item}`}>
            <IngredientIcon src={ingredient.image_mobile} alt={ingredient.name}/>
            <p className={`text text_type_main-default`}>{ingredient.name}</p>
            <p className={`text text_type_digits-default ${styles.totalBlock}`}>
              <span className={`pr-2 ${styles.price}`}>{quantity[ingredient._id]} x {ingredient.price}</span>
              <CurrencyIcon type="primary"/>
            </p>
          </li>
        ))}
        <li></li>
      </ul>
      <div className={`${styles.row}`}>
        <p className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(data.createdAt)}/>
        </p>
        <p className={`${styles.totalBlock}`}>
          <span className={`text text_type_digits-default pr-2 ${styles.price}`}>{total}</span>
          <CurrencyIcon type="primary"/>
        </p>
      </div>
    </section>
  );
}

