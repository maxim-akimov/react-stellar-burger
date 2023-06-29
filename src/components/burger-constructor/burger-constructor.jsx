import React, {useContext, useReducer, useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {SET_ORDER} from "../../services/reducers/order";
import {sendOrderRequest} from "../../services/api";



function BurgerConstructor() {
  const burgerConstructorItems = useSelector(state => state.burgerIngredients.items);

  const dispatch = useDispatch();

  const [isOpenedModal, setIsOpenedModal] = useState(false);


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const handleOrderSend = () => {
      sendOrderRequest({
        ingredients: burgerConstructorItems.map((ingredient) => ingredient._id),
      })
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: SET_ORDER,
              orderData: res
            })
            setIsOpenedModal(true);
          }
        })
        .catch((e) => {
          console.error(e)
        })
  }

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails/>
    </Modal>
  );


  return (
      <section className={styles.list}>
        <div className="pl-8">
          <ConstructorElement
            type="top"
            // key={data[0]._id}
            // isLocked={true}
            // text={`${data[0].name} (верх)`}
            // price={data[0].price}
            // thumbnail={data[0].image}
          />
        </div>

        { burgerConstructorItems && burgerConstructorItems > 0 &&
          <ul className={`${styles.scroll_constructor_container} ${styles.list} custom-scroll`}>
            { burgerConstructorItems.map((ingredient) => (
            <li key={ingredient._id} className={styles.item}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>}
        <div className="pl-8">
          <ConstructorElement
            type="bottom"
            // key={data[0]._id}
            // isLocked={true}
            // text={`${data[0].name} (низ)`}
            // price={data[0].price}
            // thumbnail={data[0].image}
          />
        </div>
        <div className={`pt-10 ${styles.total_container}`}>
          <p className={`text text_type_digits-medium ${styles.total_price}`}>
            {/*totalPriceState.totalPrice*/}
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderSend}>
            Оформить заказ
          </Button>
        </div>
        {isOpenedModal && modal}
      </section>
  )
}


/*
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};
 */


export default BurgerConstructor;