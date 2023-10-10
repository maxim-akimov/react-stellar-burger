import { FC } from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import { Ingredients } from "../../components/ingredients/ingredients";
import { Constructor } from "../../components/constructor/constructor";

import styles from "./home.module.css";



export const Home: FC = () => {
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.heading}`}>
        Собери бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <Ingredients/>
        <Constructor/>
      </DndProvider>
    </main>
  );
}
