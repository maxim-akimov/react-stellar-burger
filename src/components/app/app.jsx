import React, {useContext, useEffect, useState} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {getIngredients} from "../../utils/burger-api";
import {BurgerConstructorDataContext} from '../../services/burger-constructor-context';


function App() {
  // Стейт для хранения списка ингредиентов, доступных для добавления в бургер
  const [data, setData] = useState(false);

  // Стейт для хранения состояний процесса загрузки информации с сервера
  // (на случай добавления лоадера
  const [itemsRequest, setItemsRequest] = useState(false);

  // Стейт для хранения состояния ошибки загрузки информации с сервера
  // (на случай добавления дополнительной обработки ошибок)
  const [itemsRequestFailed, setItemsRequestFailed] = useState(false);

  // Стейт для хранения состояния модального окна (открыто/закрыто)
  const [isOpenedModal, setIsOpenedModal] = useState(false);


  const [burgerConstructorItems, setBurgerConstructorItems] = useState(null);


  // Обработка закрытия модального окна
  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  useEffect(() => {
    setItemsRequest(true);
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          setBurgerConstructorItems(res.data);
          setData(res.data);
          setItemsRequest(false);
        }
      })
      .catch((e) => {
        setItemsRequest(false);
        setItemsRequestFailed(true);
        setIsOpenedModal(true);
        console.error(e)
      })
  }, []);


  const modal = (
    <Modal onClose={handleCloseModal}>
      <h2 className={`pt-20 pb-1 text text_type_main-large`}>Ошибка!</h2>
      <p className={`p-10 text text_type_main-default`}>
        При загрузке данных с сервера произошла ошибка. Попробуйте повторить попвтку позже.
      </p>
    </Modal>
  )


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
              <BurgerConstructorDataContext.Provider
                value={burgerConstructorItems}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor/>
              </BurgerConstructorDataContext.Provider>
            </>
          }
        </main>
      </div>
      {isOpenedModal && modal}
    </>
  );
}


export default App;
