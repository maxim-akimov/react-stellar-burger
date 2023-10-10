import {
  IGetOrderDetailsFailedAction,
  IGetOrderDetailsRequestAction,
  IGetOrderDetailsSuccessAction, IResetOrderDetailsAction
} from "../types/order-details";
import {
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS, RESET_ORDER_DETAILS
} from "../constaints/order-details";
import { IOrder } from "../../types/data";


export const getOrderDetailsRequestAction = (): IGetOrderDetailsRequestAction => ({
  type: GET_ORDER_DETAILS_REQUEST,
})


export const getOrderDetailsSuccessAction = (data: IOrder): IGetOrderDetailsSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: data,
})


export const getOrderDetailsFailedAction = (value: string): IGetOrderDetailsFailedAction => ({
  type: GET_ORDER_DETAILS_FAILED,
  payload: value,
})


export const resetOrderDetailsAction = (): IResetOrderDetailsAction => ({
  type: RESET_ORDER_DETAILS,
})