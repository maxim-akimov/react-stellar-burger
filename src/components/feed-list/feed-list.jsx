import React, {useEffect} from "react";

import styles from './feed-list.module.css';
import OrderItem from "../order-item/order-item";
import {useSelector} from "react-redux";




function FeedList() {
  const ordersData = useSelector((store) => store.ws.ordersData);

  if (!ordersData) {
    return null
  }

  const orders = ordersData.orders;

  return (orders &&
    <section className={`${styles.list_container} custom-scroll`}>
      <ul className={styles.list}>
        {orders.map(order => (
          <li key={order._id}>
            <OrderItem showStatus={false} key={order._id} {...order}/>
          </li>
        ))}
      </ul>
    </section>
  )
}


export default FeedList;