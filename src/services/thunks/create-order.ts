import { AppDispatch, AppThunk } from "../types";
import {
  createOrderFailedAction,
  createOrderRequestAction,
  createOrderSuccessAction,
  setCreatedOrderAction
} from "../actions/create-order";
import { createOrderRequest } from "../../utils/api";
import { IIngredientsList } from "../../types/data";
import { resetConstructorAction } from "../actions/constructor";


export const createOrderThunk: AppThunk = (data: IIngredientsList) => (dispatch: AppDispatch) => {
  dispatch(createOrderRequestAction());

  createOrderRequest(data)
    .then((res) => {
      console.log(res)
      dispatch(setCreatedOrderAction(res.order));
      dispatch(createOrderSuccessAction());
      dispatch(resetConstructorAction())
    })
    .catch((e) => {
      dispatch(createOrderFailedAction(e.message));
    })
}