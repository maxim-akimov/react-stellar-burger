import { FC } from "react";

import styles from "./not-found-404.module.css";



export const NotFound404: FC = () => {
  return (
    <>
      <h1 className={`text text_type_main-large pt-10 pb-5`}>
        Ошибка 404
      </h1>
      <p>К сожалению, запрашиваемая страница не найдена.</p>
    </>
  );
}
