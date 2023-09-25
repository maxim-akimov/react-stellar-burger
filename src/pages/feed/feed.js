import styles from "./feed.module.css";
import FeedList from "../../components/feed-list/feed-list";
import Statistics from "../../components/statistics/statistics";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {connect, disconnect} from "../../services/actions/ws";
import {WS_URL} from "../../utils/api";


function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(WS_URL + '/all'));

    return () => {
      dispatch(disconnect());
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


export default Feed;
