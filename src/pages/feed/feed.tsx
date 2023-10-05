import { FC, useEffect } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";

import { FeedList } from "../../components/feed-list/feed-list";
import { Statistics } from "../../components/statistics/statistics";

import styles from "./feed.module.css";

import { WS_URL } from "../../utils/constaints";
import { websocketConnectAction, websocketDisconnectAction } from "../../services/actions/websocket";



export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(websocketConnectAction(WS_URL + '/all'));

    return () => {
      dispatch(websocketDisconnectAction());
    }
  }, [])


  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.heading}`}>
        Лента заказов
      </h1>
      <FeedList/>
      <Statistics/>
    </main>
  );
}

