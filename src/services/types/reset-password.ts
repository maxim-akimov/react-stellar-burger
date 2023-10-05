import { RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constaints/reset-password";


export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST
}


export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}


export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED,
  readonly payload: string
}


export type TResetPasswordActions = IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction;