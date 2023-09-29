import styles from './order-item.module.css';
import {useSelector} from "react-redux";
import {FormattedDate, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import PropTypes from "prop-types";


function OrderItem(props) {
  const {showStatus, status, name, number, createdAt, ingredients} = props;

  const burgerIngredients = useSelector(state => state.burgerIngredients.items)
    .filter((ingredient) => {
      return ingredients.some((ingredientId) => {
        return ingredientId === ingredient._id
      })
    });

  const total = burgerIngredients.reduce((sum, current) => {
    return sum + current.price;
  }, 0);

  const statuses = {
    created: 'Новый',
    pending: 'Готовится',
    done: 'Выполнен'
  };


  return (
      <div className={styles.container}>
      <div className={`pb-6 ${styles.heading}`}>
        <p className={`text text_type_digits-default ${styles.number}`}>#{number}</p>
        <p className={`text text_type_main-default text_color_inactive ${styles.date}`}>
          <FormattedDate date={new Date(createdAt)}/>
        </p>
      </div>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{name}</h3>
      {showStatus && <p
        className={`text text_type_main-default pt-2 ${styles.status} ${(status === 'done' ? styles.status_done : '')}`}>{statuses[status]}</p>}
      <div className={`pt-6 ${styles.details}`}>
        <ul className={styles.ingredientsList}>
          {burgerIngredients.map((ingredient, i) => (
            i < 6 &&
            <li key={ingredient._id} className={styles.ingredientItem} style={{zIndex: (burgerIngredients.length - i)}}>
              <IngredientIcon src={ingredient.image_mobile} alt={ingredient.name} more={(i === 5) ? (ingredients.length - 7) : false} />
            </li>
          ))}
        </ul>
        <p className={`${styles.totalBlock}`}>
          <span className={`text text_type_digits-default ${styles.total}`}>{total}</span>
          <CurrencyIcon type="primary"/></p>
      </div>
      </div>
  )
}


OrderItem.propTypes = {
  _id: PropTypes.string.isRequired,
  showStatus: PropTypes.bool,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};


export default OrderItem;