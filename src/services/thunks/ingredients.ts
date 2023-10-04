import { getIngredientsRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import {
  getIngredientsFailedAction,
  getIngredientsRequestAction,
  getIngredientsSuccessAction
} from "../actions/ingredients";



export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());

  getIngredientsRequest()
    .then((res) => {
      dispatch(getIngredientsSuccessAction(res.data));
    })
    .catch((e) => {
      dispatch(getIngredientsFailedAction(e));
    })
}

