import React from "react";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const data = {
  "_id":"60666c42cc7b410027a1a9b1",
  "name":"Краторная булка N-200i",
  "type":"bun",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v":0
}

function Modal() {
  return (
    <div className={` ${styles.container}`}>
      <button className={`${styles.close_btn}`}>
        <CloseIcon type="primary" />
      </button>
      <div className={styles.content}>
        <IngredientDetails data={data} />
      </div>
    </div>
  )
}


export default Modal;