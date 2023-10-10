import { FC } from "react";
import { useSelector } from "../../services/hooks/useSelector";
import { useDispatch } from "../../services/hooks/useDispatch";
import { Link, useLocation } from "react-router-dom";

import React, { useEffect } from "react";

import { OrderItem } from "../../components/order-item/order-item";

import styles from "./orders.module.css";

import { WS_URL } from "../../utils/constaints";
import { appWebsocketConnectAction, appWebsocketDisconnectAction } from "../../services/actions/websocket";
import { IOrder } from "../../types/data";
import { Preloader } from "../../components/preloader/preloader";


export const Orders: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem('accessToken');
  const preparedToken = (token) ? token.split('Bearer ')[1] : null;

  const ordersData = useSelector((store) => store.websocket.data);


  useEffect(() => {
    dispatch(appWebsocketConnectAction(WS_URL + '?token=' + preparedToken));
    return () => {
      dispatch(appWebsocketDisconnectAction());
    }
  }, [])


  if (!ordersData) return <Preloader />;
  if (!ordersData.orders) return null;

  return (
    <ul className={`${styles.list}`}>
      {ordersData.orders.map((order: IOrder) => (
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
