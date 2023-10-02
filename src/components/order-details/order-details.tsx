import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { Preloader } from "../preloader/preloader";

import styles from './order-details.module.css'

import { getOrderDetails, RESET_ORDER_DETAILS } from "../../services/actions/order-details";
import { IIngredient } from "../../types/data";

export const OrderDetails = () => {
  const { orderNumber } = useParams();

  const dispatch = useDispatch();

  const orderDetails = useSelector((store) => store.orderDetails);
  const ingredients = useSelector(state => state.burgerIngredients.items);


  useEffect(() => {
    dispatch(
      getOrderDetails(orderNumber)
    )
    return () => {
      dispatch({ type: RESET_ORDER_DETAILS });
    }
  }, [])


  if (!orderDetails.data) {
    return <Preloader type={'modal'}/>;
  }

  const order = orderDetails.data.orders[0];
  const quantity = {};

  order.ingredients.forEach((ingredientId: string) => {
    (quantity[ingredientId]) ? quantity[ingredientId] += 1 : quantity[ingredientId] = 1;
  })


  const burgerIngredients = ingredients.filter((ingredient: IIngredient) => {
    return order.ingredients.some((ingredientId: string) => {
      return ingredientId === ingredient._id;
    })
  });


  const total = burgerIngredients.reduce((sum, current) => {
    return sum + current.price;
  }, 0)


  const statuses = {
    created: 'Новый',
    pending: 'Готовится',
    done: 'Выполнен'
  };


  return (
    <section className={`pt-30 pb-15 ${styles.container}`}>
      <p className={`text text_type_digits-default pb-10 ${styles.number}`}>{order.number}</p>
      <h1 className={`text text_type_main-medium pb-3${styles.title}`}>{order.name}</h1>
      <p
        className={`text text_type_main-default pb-15 ${styles.status} ${(order.status === 'done' ? styles.status_done : '')}`}>{statuses[order.status]}</p>
      <h2 className={`text text_type_main-medium pb-6 ${styles.title}`}>Состав:</h2>
      <ul className={`${styles.list} custom-scroll`}>
        {burgerIngredients.map((ingredient) => (
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
          <FormattedDate date={new Date(order.createdAt)}/>
        </p>
        <p className={`${styles.totalBlock}`}>
          <span className={`text text_type_digits-default pr-2 ${styles.price}`}>{total}</span>
          <CurrencyIcon type="primary"/>
        </p>
      </div>
    </section>
  );
}

