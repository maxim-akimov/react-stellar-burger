import React, {useContext, useEffect, useMemo, useReducer, useState} from "react";
import {useDispatch} from "react-redux";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

import { DataContext } from '../../services/app-context';
import { ConstructorContext } from "../../services/app-context";
import {getIngredients} from "../../services/actions/ingredients";


const totalPriceInitialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { totalPrice: state.totalPrice + action.payload };
    case "delete":
      return { totalPrice: state.totalPrice - action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


function App() {
  // Стейт для хранения списка ингредиентов, доступных для добавления в бургер
  const [data, setData] = useState(false);

  // Стейт для хранения состояния ошибки загрузки информации с сервера
  // (на случай добавления дополнительной обработки ошибок)
  const [itemsRequestFailed, setItemsRequestFailed] = useState(false);

  // Стейт для хранения состояния модального окна (открыто/закрыто)
  const [isOpenedModal, setIsOpenedModal] = useState(false);


  // Редьюсер для динамического расчета стоимости
  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);


  // Обработка закрытия модального окна
  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  /*
  useEffect(() => {
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          setData(res.data);
        }
      })
      .catch((e) => {
        setItemsRequestFailed(true);
        setIsOpenedModal(true);
        console.error(e)
      })
  }, []);
*/

  const modal = (
    <Modal onClose={handleCloseModal}>
      <h2 className={`pt-20 pb-1 text text_type_main-large`}>Ошибка!</h2>
      <p className={`p-10 text text_type_main-default`}>
        При загрузке данных с сервера произошла ошибка. Попробуйте повторить попвтку позже.
      </p>
    </Modal>
  )


  const ConstructorContextValue = useMemo(() => {
    return { totalPriceState, totalPriceDispatcher };
  }, [totalPriceState, totalPriceDispatcher]);


  return (
    <>
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
          <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.heading}`}>
            Собери бургер
          </h1>
          {
            data &&
            <>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </>
          }
        </main>
      </div>
      {isOpenedModal && modal}
    </>
  );
}


export default App;
