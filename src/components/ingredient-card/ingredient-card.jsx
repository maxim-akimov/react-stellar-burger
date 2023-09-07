import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";

import styles from './ingredient-card.module.css';

import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import {
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT
} from "../../services/reducers/ingredient";


function IngredientCard(props) {
  const {_id, type, image, price, name} = props;
  const [isOpenedModal, setIsOpenedModal] = React.useState(false);
  const {bun, other} = useSelector(state => state.burgerConstructor);

  const quantity = useMemo(() => {
    return (type === 'bun' && bun && bun._id === _id)
      ? 1
      : other.reduce((counter, item) => {
        return (item._id === _id) ? counter + 1 : counter;
      }, 0);
  }, [bun, other])


  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: props
  });


  const handleOpenModal = () => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      ingredient: props
    })
    setIsOpenedModal(true);
  }


  const handleCloseModal = () => {
    dispatch({
      type: RESET_CURRENT_INGREDIENT
    })
    setIsOpenedModal(false);
  }



  const modal = (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails {...props} />
    </Modal>
  )




  return (
    <>
      <li className={styles.card} onClick={() => handleOpenModal(price)} ref={dragRef}>
        <img src={image} alt="props.name"/>
        <div className={styles.price}>
          {price}
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>
          {name}
        </p>
        {quantity > 0 && <Counter count={quantity} size="default" extraClass="m-1" />}
      </li>
      {isOpenedModal && modal}
    </>
  )
}


IngredientCard.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};


export default IngredientCard;