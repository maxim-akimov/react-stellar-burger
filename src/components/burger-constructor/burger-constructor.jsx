import React, {useContext, useReducer, useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { DataContext } from "../../services/app-context";
import { ConstructorContext } from "../../services/app-context";
import { OrderDetailsContext } from "../../services/app-context";



function BurgerConstructor() {
  //const data = useContext(DataContext);
  //const { totalPriceState } = useContext(ConstructorContext);


/*
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);


  const handleOpenModal = () => {
    setIsOpenedModal(true);
  }


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const handleOrderSend = () => {
    sendOrder({
      ingredients: data.map((ingredient) => ingredient._id),
    })
      .then((res) => {
        if (res && res.success) {
          setOrderDetails(res);
          setIsOpenedModal(true);
        }
      })
      .catch((e) => {
        setOrderDetails(true);
        console.error(e)
      })
  }

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetailsContext.Provider value={{orderDetails, setOrderDetails}}>
        <OrderDetails/>
      </OrderDetailsContext.Provider>
    </Modal>
  );


  return (
      <section className={styles.list}>
        <div className="pl-8">
          <ConstructorElement
            key={data[0]._id}
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>

        <ul className={`${styles.scroll_constructor_container} ${styles.list} custom-scroll`}>
          {data.map((ingredient) => (
            <li key={ingredient._id} className={styles.item}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
        <div className="pl-8">
          <ConstructorElement
            key={data[0]._id}
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`pt-10 ${styles.total_container}`}>
          <p className={`text text_type_digits-medium ${styles.total_price}`}>
            {totalPriceState.totalPrice}
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderSend}>
            Оформить заказ
          </Button>
        </div>
        {isOpenedModal && modal}
      </section>
  )

 */
}


/*
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};
 */


export default BurgerConstructor;