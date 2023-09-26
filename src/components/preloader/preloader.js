import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './preloader.module.css';
import PropTypes from "prop-types";
import IngredientIcon from "../ingredient-icon/ingredient-icon";

function Preloader({type}) {
  return (
    <div className={`${styles.preloader} ${(type === 'modal') ? styles.preloader_type_modal : ''}`}>
      <BurgerIcon type="primary" />
    </div>
  )
}


Preloader.propTypes = {
  type: PropTypes.oneOf(['modal'])
};


export default Preloader;