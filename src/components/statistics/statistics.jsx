import React from "react";

import styles from './statistics.module.css';
import {useSelector} from "react-redux";


function Statistics() {
  const orders = useSelector((store) => store.ws.ordersData);


  if (!orders) {
    return null
  }


  const doneOrders = orders.orders.filter((order) => order.status === 'done').slice(0, 10);
  const inProcessOrders = orders.orders.filter((order) => order.status === 'pending').slice(0, 10);



  return (
    orders &&
    <section className={styles.container}>
      <h2 className={`text text_type_main-medium pb-6 ${styles.doneHeading}`}>Готовы:</h2>
      <ul className={`${styles.numbersList} ${styles.done}`}>
        {doneOrders.map((order) => (
          <li key={order._id} className={`text text_type_digits-default`}>{order.number}</li>
        ))}
      </ul>
      <h2 className={`text text_type_main-medium pb-6 ${styles.processHeading}`}>В работе:</h2>
      <ul className={`${styles.numbersList} ${styles.process}`}>
        {inProcessOrders.map((order) => (
          <li key={order._id} className={`text text_type_digits-default`}>{order.number}</li>
        ))}      </ul>
      <h2 className={`text text_type_main-medium pt-15 ${styles.totalHeading}`}>Выполнено за все время:</h2>
      <p className={`text text_type_digits-large ${styles.digits}`}>{orders.total}</p>
      <h2 className={`text text_type_main-medium pt-15 ${styles.totalHeading}`}>Выполнено за сегодня:</h2>
      <p className={`text text_type_digits-large ${styles.digits}`}>{orders.totalToday}</p>
    </section>
  )
}


export default Statistics;