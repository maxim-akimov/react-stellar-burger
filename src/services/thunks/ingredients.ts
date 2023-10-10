import { getIngredientsRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import {
  getIngredientsFailedAction,
  getIngredientsRequestAction,
  getIngredientsSuccessAction
} from "../actions/ingredients";



export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());
  console.log('ingredientsThunk')
  getIngredientsRequest()
    .then((res) => {
      console.log('ingredients', res)
      dispatch(getIngredientsSuccessAction(res.data));
    })
    .catch((e) => {
      dispatch(getIngredientsFailedAction(e.message));
    })
}

