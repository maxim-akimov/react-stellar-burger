import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED
} from "../constaints/burger-ingredients";
import { getBurgerIngredientsRequest } from "../../utils/api";


export function getBurgerIngredients() {
  return (dispatch) => {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    })

    getBurgerIngredientsRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            items: res.data
          })
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED
          })
        }
      }).catch(err => {
      dispatch({
        type: GET_BURGER_INGREDIENTS_FAILED
      })
    })
  }
}
