import React, {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";

import {sendOrderRequest} from "../../utils/api";

import styles from './burger-constructor.module.css';

import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import ConstructorListItem from "../constructor-list-item/constructor-list-item";
import OrderDetails from "../order-details/order-details";

import {
  ADD_IN_CONSTRUCTOR,
  ORDER_INGREDIENTS
} from "../../services/actions/burger-constructor";
import {SET_ORDER, SET_ORDER_FAILED, SET_ORDER_REQUEST, SET_ORDER_SUCCESS} from "../../services/actions/order";



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


  const cards = useSelector((state) => state.burgerConstructor.other)
  const findCard = useCallback(
    (uuid) => {
      const card = cards.filter((c) => `${c.uuid}` === uuid)[0]
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )


  const moveCard = useCallback(
    (uuid, atIndex) => {
      const {card, index} = findCard(uuid)
      dispatch({
        type: ORDER_INGREDIENTS,
        fromIndex: index,
        toIndex: atIndex
      })
    },
    [findCard, cards],
  )


  const [, orderingDropRef] = useDrop(() => ({accept: 'ingredients-ordering'}))


  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const handleOrderSend = () => {
    dispatch({
      type: SET_ORDER_REQUEST
    })
    sendOrderRequest({
      ingredients: [
        bun._id,
        ...other.map((ingredient) => ingredient._id),
        bun._id,
      ],
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_ORDER,
            orderData: res
          })
          dispatch({
            type: SET_ORDER_SUCCESS
          })
          setIsOpenedModal(true);
        }
      })
      .catch((e) => {
        dispatch({
          type: SET_ORDER_FAILED
        })
        console.error(e)
      })
  }


  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails/>
    </Modal>
  );


  let backgroundClass = '';

  if (isTarget) {
    backgroundClass = styles.is_target;
    if (isHover) {
      backgroundClass = styles.is_hover;
    }
  } else {
    backgroundClass = styles.default;
  }


  const totalPrice = useMemo(() => {
    const bunPrice = (bun && bun.price) ? bun.price * 2 : 0;

    return bunPrice + other.reduce((sum, ingredient) => {
      return (ingredient && ingredient.price) ? sum + ingredient.price : sum;
    }, 0)
  }, [bun, other])


  return (
    <section className={styles.list}>
      <div className={`${styles.drag_target} ${backgroundClass}`} ref={dropTarget}>

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
        {other && other.length > 0 &&
          <ul className={`${styles.scroll_constructor_container} ${styles.list} custom-scroll`} ref={orderingDropRef}>
            {other.map((ingredient) => (
              <ConstructorListItem
                key={ingredient.uuid}
                {...ingredient}
                findCard={findCard}
                moveCard={moveCard}/>
            ))}
          </ul>}
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
          {totalPrice}
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderSend}>
          Оформить заказ
        </Button>
      </div>
      {isOpenedModal && modal}
    </section>
  )
}


export default BurgerConstructor;