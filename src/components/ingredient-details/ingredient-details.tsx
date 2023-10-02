import { FC } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from './ingredient-details.module.css';
import { IIngredient } from "../../types/data";


export const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();

  const burgerIngredients = useSelector((state) => state.burgerIngredients.items);
  const ingredientData = burgerIngredients.find((ingredient: IIngredient) => ingredient._id === ingredientId);


  return (
    <>
      <h2 className={`pt-30 pr-10 pl-10 text text_type_main-large ${styles.heading}`}>
        Детали ингредиента
      </h2>
      {(ingredientData) ? (<>
          <img src={ingredientData.image_large} alt={ingredientData.name} className={styles.image}/>
          <p className={`pt-4 pb-8 text text_type_main-medium`}>{ingredientData.name}</p>
          <ul className={`pb-15 text_color_inactive ${styles.energy}`}>
            <li className={styles.energy_item}>
              <p className={`text text_type_main-default`}>
                Калории, ккал
              </p>
              <p className="text text_type_digits-default">
                {ingredientData.calories}
              </p>
            </li>
            <li className={styles.energy_item}>
              <p className={`text text_type_main-default`}>
                Белки, г
              </p>
              <p className="text text_type_digits-default">
                {ingredientData.proteins}
              </p>
            </li>
            <li className={styles.energy_item}>
              <p className={`text text_type_main-default`}>
                Жиры, г
              </p>
              <p className="text text_type_digits-default">
                {ingredientData.fat}
              </p>
            </li>
            <li className={styles.energy_item}>
              <p className={`text text_type_main-default`}>
                Углеводы, г
              </p>
              <p className="text text_type_digits-default">
                {ingredientData.carbohydrates}
              </p>
            </li>
          </ul>
        </>
      ) : (
        <p className={`pt-4 pb-8 text text_type_main-default`}>Не удалось загрузить информацию об ингредиенте</p>
      )}
    </>
  )
}