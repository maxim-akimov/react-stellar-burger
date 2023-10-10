import { IOrder } from "../../types/data";
import {
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from "../constaints/register";
import { IRegisterUserFailedAction, IRegisterUserRequestAction, IRegisterUserSuccessAction } from "../types/register";


export const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST,
})


export const registerUserSuccessAction = (): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
})


export const registerUserFailedAction = (value: string): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED,
  payload: value,
})