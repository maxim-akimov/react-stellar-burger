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
import {useDrop} from "react-dnd";
import {ADD_IN_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR} from "../../services/actions/burger-constructor";


function BurgerConstructor() {
  const {bun, other} = useSelector(state => state.burgerConstructor);

  const dispatch = useDispatch();

  const [{isHover, isTarget}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      dispatch({
        type: ADD_IN_CONSTRUCTOR,
        ingredientType: '',
        ingredient: itemId
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      isTarget: monitor.canDrop()
    })
  });

  const [isOpenedModal, setIsOpenedModal] = useState(false);


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const handleOrderSend = () => {
    sendOrderRequest({
      //ingredients: burgerConstructorItems.map((ingredient) => ingredient._id),
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


  const handleRemove = (uuid) => {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      uuid: uuid
    });
  }


  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails/>
    </Modal>
  );


  let background = '';

  if (isTarget) {
    background = 'rgba(255,255,255,.03)';
    if (isHover) {
      background = 'rgba(255,255,255,.05)';
    }
  } else {
    background = 'transparent';
  }

  return (
    <section className={styles.list}>
      <div className={styles.drag_target} ref={dropTarget} style={{background}}>

        {bun === null && other.length === 0 && <p>Перетащите ингредиенты сюда</p>}
        {bun && <div className="pl-8">
          <ConstructorElement
            type="top"
            key={bun._id}
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>}
        <ul className={`${styles.scroll_constructor_container} ${styles.list} custom-scroll`}>
              {other && other.length > 0 && other.map((ingredient) => (
                <li key={ingredient.uuid} className={styles.item}>
                  <DragIcon type="primary"/>
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => handleRemove(ingredient.uuid)}
                  />
                </li>
              ))}
        </ul>
          {bun && <div className="pl-8">
            <ConstructorElement
              type="bottom"
              key={bun._id}
              isLocked={true}
              text={`${bun.name} (ybp)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>}
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