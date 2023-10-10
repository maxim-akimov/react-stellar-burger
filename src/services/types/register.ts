import { REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constaints/register";


export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST
}


export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS
}


export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED,
  readonly payload: string
}


export type TRegisterUserActions = IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction;