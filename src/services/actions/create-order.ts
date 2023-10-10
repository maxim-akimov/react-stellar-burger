import { IOrder } from "../../types/data";
import {
  ICreateOrderFailedAction,
  ICreateOrderRequestAction,
  ICreateOrderSuccessAction,
  IResetOrderAction,
  ISetCreatedOrderAction
} from "../types/create-order";
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  RESET_ORDER,
  SET_CREATED_ORDER
} from "../constaints/create-order";


export const setCreatedOrderAction = (value: IOrder): ISetCreatedOrderAction => ({
  type: SET_CREATED_ORDER,
  payload: value
})


export const createOrderRequestAction = (): ICreateOrderRequestAction => ({
  type: CREATE_ORDER_REQUEST
})


export const createOrderSuccessAction = (): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS
})


export const createOrderFailedAction = (value: string): ICreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED,
  payload: value
})


export const resetOrderAction = (): IResetOrderAction => ({
  type: RESET_ORDER
})