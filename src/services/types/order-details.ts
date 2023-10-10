import {
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS, RESET_ORDER_DETAILS
} from "../constaints/order-details";
import { IOrder } from "../../types/data";


export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST
}


export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS,
  readonly payload: IOrder
}


export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORDER_DETAILS_FAILED,
  readonly payload: string
}


export interface IResetOrderDetailsAction {
  readonly type: typeof RESET_ORDER_DETAILS
}


export type TOrderDetailsActions = IGetOrderDetailsRequestAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsFailedAction
  | IResetOrderDetailsAction;