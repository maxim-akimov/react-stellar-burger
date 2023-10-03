// Библиотеки
import React, {FC, useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {useNavigate} from 'react-router-dom';
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

// Компоненты
import { Modal } from "../modal/modal";
import {ConstructorListItem} from "../constructor-list-item/constructor-list-item";
import { OrderConfirmation } from "../order-confirmation/order-confirmation";
import { Preloader } from "../preloader/preloader";

// Стили
import styles from './burger-constructor.module.css';

// Api
import {
    ADD_IN_CONSTRUCTOR,
    ORDER_INGREDIENTS,
    RESET_CONSTRUCTOR
} from "../../services/constaints/burger-constructor";
import {
    SET_ORDER,
    SET_ORDER_FAILED,
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS
} from "../../services/constaints/order";

import {sendOrderRequest} from "../../utils/api";
import {checkUserAuthThunk} from "../../services/thunks/user";

// Типы
import {IIngredient, IIngredientConstructor} from "../../types/data";


export const BurgerConstructor: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.user);
    const {orderRequest} = useSelector((store) => store.order);
    const {bun, other} = useSelector(store => store.burgerConstructor);
    const cards = useSelector((state) => state.burgerConstructor.other)

    const [, orderingDropRef] = useDrop(() => ({accept: 'ingredients-ordering'}))

    const [isOpenedModal, setIsOpenedModal] = useState(false);


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


    const findCard = useCallback(
        (uuid: string) => {
            const card: IIngredientConstructor = cards.filter((c: IIngredientConstructor) => `${c.uuid}` === uuid)[0]
            return {
                card,
                index: cards.indexOf(card) as number,
            }
        },
        [cards],
    )


    const moveCard = useCallback(
        (uuid: string, atIndex: number) => {
            const {card, index} = findCard(uuid)
            dispatch({
                type: ORDER_INGREDIENTS,
                fromIndex: index,
                toIndex: atIndex
            })
        },
        [findCard, cards],
    )


    const handleCloseModal = () => {
        setIsOpenedModal(false);
    }

    const handleOrderSend = () => {
        dispatch(checkUserAuthThunk());

        if (!user) {
            return navigate('/login');
        }

        dispatch({
            type: SET_ORDER_REQUEST
        })
        sendOrderRequest({
            ingredients: [
                bun._id,
                ...other.map((ingredient: IIngredient) => ingredient._id),
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
                    dispatch({
                        type: RESET_CONSTRUCTOR
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
            {(orderRequest && <Preloader/>)}
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
                          {other.map((ingredient: IIngredientConstructor) => (
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