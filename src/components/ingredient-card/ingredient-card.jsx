import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";


function IngredientCard(props) {
  const {image, price, name, __v} = props;
  const [isOpenedModal, setIsOpenedModal] = React.useState(false);


  const handleOpenModal = () => {
    setIsOpenedModal(true);
  }


  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const modal = (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails {...props} />
    </Modal>
  )


  const quantity = Math.random().toFixed();


  return (
    <>
      <li className={styles.card} onClick={handleOpenModal}>
        <img src={image} alt="props.name"/>
        <div className={styles.price}>
          {price}
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>
          {name}
        </p>
        {quantity > 0 && <Counter count={1} size="default" extraClass="m-1" />}
      </li>
      {isOpenedModal && modal}
    </>
  )
}


IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};


export default IngredientCard;