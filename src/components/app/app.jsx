import React,{useState} from "react";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {
  // Стейт для хранения состояния модального окна (открыто/закрыто)
  const [isOpenedModal, setIsOpenedModal] = useState(false);


  // Обработка закрытия модального окна
  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


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
            <>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
              </DndProvider>
            </>
          }
        </main>
      </div>
      {isOpenedModal && modal}
    </>
  );
}


export default App;
