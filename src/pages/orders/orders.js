import React, {useEffect, useState} from "react";


import styles from "./orders.module.css";
import OrderItem from "../../components/order-item/order-item";
import {useDispatch, useSelector} from "react-redux";
import {connect, disconnect} from "../../services/actions/ws";
import {WS_URL} from "../../utils/api";


function Orders() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken').split('Bearer ')[1];

  useEffect(() => {
    dispatch(connect(WS_URL + '?token=' + token));
  }, [])

  useEffect(() => {
    return () => {
      dispatch(disconnect());
    }
  }, [])

  const ordersData = useSelector((store) => store.ws.ordersData);

  if (!ordersData) {
    return null
  }

  const orders = ordersData.orders;

  return (
    <>
      <ul className={`${styles.list}`}>
        {orders.map((order) => (
          <li key={order._id} className={styles.item}>
            <OrderItem showStatus={true} {...order} />
          </li>
        ))}
      </ul>
    </>
  );
}


export default Orders;
