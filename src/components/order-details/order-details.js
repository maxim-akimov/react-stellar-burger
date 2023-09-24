import styles from './order-details.module.css'
import {useDispatch, useSelector} from "react-redux";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import React, {useEffect, useState} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useParams} from "react-router-dom";
import {getOrderDetails} from "../../services/actions/order-details";

function OrderDetails() {
  const {orderNumber} = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(
      getOrderDetails(orderNumber)
    )
  }, [])

  const orderDetails = useSelector((store) => store.orderDetails);
  const ingredients = useSelector(state => state.burgerIngredients.items);

  if (!orderDetails.data) {
    return null;
  }

  const order = orderDetails.data.orders[0];
  console.log(orderDetails)


  const quantity = {};

  order.ingredients.forEach((ingredientId) => {
    (quantity[ingredientId]) ? quantity[ingredientId] += 1 : quantity[ingredientId] = 1;
  })


  const burgerIngredients = ingredients.filter((ingredient) => {
    return order.ingredients.some((ingredientId) => {
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
          <span className={`pr-2 ${styles.price}`}>{total}</span>
          <CurrencyIcon type="primary"/>
        </p>
      </div>
    </section>
  );
}

export default OrderDetails;