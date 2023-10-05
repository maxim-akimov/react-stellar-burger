import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  RESET_ORDER_DETAILS
} from "../constaints/order-details";
import { getOrderDetailsRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import {
  getOrderDetailsFailedAction,
  getOrderDetailsRequestAction,
  getOrderDetailsSuccessAction
} from "../actions/order-details";



export const getOrderDetailsThunk: AppThunk = (value) => (dispatch: AppDispatch) => {
  dispatch(getOrderDetailsRequestAction());

  getOrderDetailsRequest()
    .then((res) => {
      dispatch(getOrderDetailsSuccessAction(res.data.orders[0]));
    })
    .catch((e) => {
      dispatch(getOrderDetailsFailedAction(e));
    })
}