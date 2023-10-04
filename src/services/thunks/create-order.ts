import { AppDispatch, AppThunk } from "../types";
import {
  createOrderFailedAction,
  createOrderRequestAction,
  createOrderSuccessAction,
  setCreatedOrderAction
} from "../actions/create-order";
import { createOrderRequest } from "../../utils/api";
import { IIngredientsList } from "../../types/data";


export const createOrderThunk: AppThunk = (data: IIngredientsList) => (dispatch: AppDispatch) => {
  dispatch(createOrderRequestAction());

  createOrderRequest(data)
    .then((res) => {
      dispatch(setCreatedOrderAction(res.data));
      dispatch(createOrderSuccessAction());
    })
    .catch((e) => {
      dispatch(createOrderFailedAction(e));
    })
}