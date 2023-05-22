import React from "react";
import styles from "./app.module.css";
import {ingredientsApiUrl} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal-overlay/modal-overlay";
import ModalOverlay from "../modal-overlay/modal-overlay";

function App() {
  const [state, setState] = React.useState({
    isLoaded: false,
    data: []
  });

  React.useEffect(() => {
    fetch(ingredientsApiUrl + '/api/ingredients')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then((res) => {
        setState({
          isLoaded: true,
          data: res.data
        });
      })
      .catch((e) => {
        console.error(e)
      })
  }, []);


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
    </>
  );
}


export default App;
