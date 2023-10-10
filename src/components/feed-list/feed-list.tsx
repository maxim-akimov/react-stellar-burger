// Библиотеки
import {FC} from "react";
import {Link, useLocation} from "react-router-dom";

// Хуки
import {useSelector} from "../../services/hooks/useSelector";

// Компоненты
import { OrderItem } from "../order-item/order-item";
import { Preloader } from "../preloader/preloader";

// Стили
import styles from './feed-list.module.css';

// Типы
import {IOrder} from "../../types/data";


export const FeedList: FC = () => {
    const location = useLocation();
    
    const ordersData = useSelector((store) => store.websocket.data);


    if (!ordersData) return <Preloader/>;
    if (ordersData.length === 0) return null;


    return (ordersData.orders &&
      <section className={`${styles.list_container} custom-scroll`}>
        <ul className={styles.list}>
            {ordersData.orders.map((order: IOrder) => (
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