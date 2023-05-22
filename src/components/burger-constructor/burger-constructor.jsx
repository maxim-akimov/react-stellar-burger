import React from "react";
import styles from './burger-constructor.module.css';
import {Button, DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from '../../utils/prop-types'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";


function BurgerConstructor(props) {
  const [isOpenedModal, setIsOpenedModal] = React.useState(false);


  const handleOpenModal = () => {
    setIsOpenedModal(true);
  }


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails/>
    </Modal>
  );


  return (
    <section className={styles.list}>
      <div className="pl-8">
        <ConstructorElement
          key={props.data[0]._id}
          type="top"
          isLocked={true}
          text={props.data[0].name}
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
      </div>

      <ul className={`${styles.scroll_constructor_container} ${styles.list} custom-scroll`}>
        {props.data.map((ingredient) => (
          <li key={ingredient._id} className={styles.item}>
            <DragIcon type="primary"/>
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <div className="pl-8">
        <ConstructorElement
          key={props.data[0]._id}
          type="bottom"
          isLocked={true}
          text={props.data[0].name}
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
      </div>
      <div className={`pt-10 ${styles.total_container}`}>
        <p className={`text text_type_digits-medium ${styles.total_price}`}>
          610

        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpenedModal && modal}
    </section>
  )
}


BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
};


export default BurgerConstructor;