import styles from "./home.module.css";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function Home() {
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.heading}`}>
        Собери бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    </main>
  );
}


export default Home;
