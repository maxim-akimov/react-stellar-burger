import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import React, { useEffect } from "react";

import { OrderItem } from "../../components/order-item/order-item";

import styles from "./orders.module.css";

import { WS_URL } from "../../utils/constaints";
import { connect, disconnect } from "../../services/actions/websocket";
import { IOrder } from "../../types/data";



export const Orders: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem('accessToken');
  const preparedToken = (token) ? token.split('Bearer ')[1] : null;

  const ordersData = useSelector((store) => store.ws.ordersData);


  useEffect(() => {
    dispatch(connect(WS_URL + '?token=' + preparedToken));
    return () => {
      dispatch(disconnect());
    }
  }, [])



  if (!ordersData) {
    return null
  }

  const orders = ordersData.orders;

  return (
    <ul className={`${styles.list}`}>
      {orders.map((order:IOrder) => (
        <li key={order._id} className={styles.item}>
          <Link
            to={`/profile/orders/${order.number}`}
            state={{ background: location }}
            className={styles.link}
          >
            <OrderItem showStatus={true} {...order} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
