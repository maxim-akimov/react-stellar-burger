import styles from './feed-list.module.css';
import OrderItem from "../order-item/order-item";
import {useSelector} from "react-redux";
import Preloader from "../preloader/preloader";
import {Link, useLocation} from "react-router-dom";


function FeedList() {
  const location = useLocation();
  const ordersData = useSelector((store) => store.ws.ordersData);

  if (!ordersData) {
    return <Preloader/>;
  }

  const orders = ordersData.orders;

  return (orders &&
    <section className={`${styles.list_container} custom-scroll`}>
      <ul className={styles.list}>
        {orders.map(order => (
          <li key={order._id}>
            <Link
              to={`/feed/${order.number}`}
              state={{background: location}}
              className={styles.link}
            >
              <OrderItem showStatus={false} key={order._id} {...order}/>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}


export default FeedList;