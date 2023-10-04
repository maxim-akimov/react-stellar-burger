import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  SET_CREATED_ORDER
} from "../constaints/create-order";
import { IOrder } from "../../types/data";


export interface ISetCreatedOrderAction {
  readonly type: typeof SET_CREATED_ORDER,
  readonly payload: IOrder
}


export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST
}


export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS
}


export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED,
  readonly payload: string
}


export type TCreateOrderActions = ISetCreatedOrderAction
  | ICreateOrderRequestAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction;