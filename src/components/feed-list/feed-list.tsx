// Библиотеки
import {FC} from "react";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

// Компоненты
import { OrderItem } from "../order-item/order-item";
import { Preloader } from "../preloader/preloader";

// Стили
import styles from './feed-list.module.css';

// Типы
import {IOrder} from "../../types/data";


export const FeedList: FC = () => {
    const location = useLocation();
    const ordersData = useSelector((store) => store.ws.ordersData);

    if (!ordersData) {
        return <Preloader/>;
    }

    const orders = ordersData.orders;

    return (orders &&
      <section className={`${styles.list_container} custom-scroll`}>
        <ul className={styles.list}>
            {orders.map((order: IOrder) => (
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