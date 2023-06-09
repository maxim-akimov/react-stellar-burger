import React from "react";
import styles from './order-details.module.css';


function OrderDetails() {
  return (
    <>
      <p className={`pt-30 pb-8 text text_type_digits-large ${styles.number}`}>
        1234567
      </p>
      <p className="pb-15 text text_type_main-medium">идентификатор заказа</p>
      <div className={`pb-15 ${styles.confirm_icon}`}></div>
      <p className={`pb-2 text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`pb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}


export default OrderDetails;