import styles from './ingredient-details.module.css';

import PropTypes from "prop-types";


function IngredientDetails(props) {
  const {
    image_large,
    name,
    calories,
    proteins,
    fat,
    carbohydrates
  } = props;


  return (
    <>
      <h2 className={`pt-10 pr-10 pl-10 text text_type_main-large ${styles.heading}`}>
        Детали ингредиента
      </h2>
      <img src={image_large} alt={name} className={styles.image}/>
      <p className={`pt-4 pb-8 text text_type_main-medium`}>{name}</p>
      <ul className={`pb-15 text_color_inactive ${styles.energy}`}>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Калории, ккал
          </p>
          <p className="text text_type_digits-default">
            {calories}
          </p>
        </li>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Белки, г
          </p>
          <p className="text text_type_digits-default">
            {proteins}
          </p>
        </li>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Жиры, г
          </p>
          <p className="text text_type_digits-default">
            {fat}
          </p>
        </li>
        <li className={styles.energy_item}>
          <p className={`text text_type_main-default`}>
            Углеводы, г
          </p>
          <p className="text text_type_digits-default">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </>
  )
}


IngredientDetails.propTypes = {
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number
};


export default IngredientDetails;