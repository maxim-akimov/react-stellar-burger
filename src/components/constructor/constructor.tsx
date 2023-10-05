import React, { FC, useCallback, useMemo, useState } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "../modal/modal";
import { ConstructorListItem } from "../constructor-list-item/constructor-list-item";
import { OrderConfirmation } from "../order-confirmation/order-confirmation";
import { Preloader } from "../preloader/preloader";

import styles from './constructor.module.css';

import { checkUserAuthThunk } from "../../services/thunks/authentication";

import { IConstructorIngredient, IIngredient } from "../../types/data";
import { addIngredientAction, rearrangeIngredientAction } from "../../services/actions/constructor";
import { createOrderThunk } from "../../services/thunks/create-order";


export const Constructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const { requestState } = useSelector((store) => store.order);
  const { bun, other } = useSelector((store) => store.burgerConstructor);
  const cards = useSelector((state) => state.burgerConstructor.other)


  const [, orderingDropRef] = useDrop(() => ({ accept: 'ingredients-ordering' }))

  const [isOpenedModal, setIsOpenedModal] = useState(false);


  const [{ isHover, isTarget }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredientAction(item));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      isTarget: monitor.canDrop()
    })
  });


  const findCard = useCallback(
    (uuid: string): { card: IIngredient,  index: number } => {
      const card: IConstructorIngredient = cards.filter((c: IConstructorIngredient) => c.uuid === uuid)[0]
      return {
        card: card,
        index: cards.indexOf(card) as number,
      }
    },
    [cards],
  )


  const moveCard = useCallback(
    (uuid: string, atIndex: number): void => {
      const { index } = findCard(uuid)
      dispatch(rearrangeIngredientAction({ from: index, to: atIndex }))
    },
    [findCard, cards],
  )


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const handleOrderSend = () => {
    dispatch(checkUserAuthThunk());

    if (!user) return navigate('/login');
    if (!bun) return null;

    dispatch(
      createOrderThunk({
        ingredients: [
          bun._id,
          ...other.map((ingredient: IIngredient) => ingredient._id),
          bun._id,
        ],
      })
    );
  }


  if (requestState.success) setIsOpenedModal(true);


  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderConfirmation/>
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

    return bunPrice + other.reduce((sum: number, ingredient: IIngredient) => {
      return (ingredient && ingredient.price) ? sum + ingredient.price : sum;
    }, 0)
  }, [bun, other])


  return (
    <>
      {(requestState.request && <Preloader/>)}
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
            <ul className={`${styles.scroll_constructor_container} ${styles.list} custom-scroll`}
                ref={orderingDropRef}>
              {other.map((ingredient: IConstructorIngredient) => (
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
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>}
        </div>
        <div className={`pt-10 ${styles.total_container}`}>
          <p className={`text text_type_digits-medium ${styles.total_price}`}>
            {totalPrice}
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderSend} disabled={(!bun)}>
            Оформить заказ
          </Button>
        </div>
        {isOpenedModal && modal}
      </section>
    </>
  )
}