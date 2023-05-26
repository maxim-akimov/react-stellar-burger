import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {getIngredients} from "../../utils/burger-api";


function App() {
  const [state, setState] = React.useState({
    isLoaded: false,
    isError: false,
    error: '',
    data: []
  });


  const [isOpenedModal, setIsOpenedModal] = React.useState(false);


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        setState({
          isLoaded: true,
          data: res.data
        });
      })
      .catch((e) => {
        setState({
          isLoaded: false,
          isError: true,
          error: e
        })

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
      <p className={`p-10 text text_type_main-default`}>
        {state.error}
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
            state.isLoaded &&
            <>
              <BurgerIngredients data={state.data}/>
              <BurgerConstructor data={state.data}/>
            </>
          }
        </main>
      </div>
      {isOpenedModal && modal}
    </>
  );
}


export default App;
