import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS
} from "../constaints/forgot-password";



export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}


export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}


export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED,
  readonly payload: string
}


export type TForgotPasswordActions = IForgotPasswordRequestAction
| IForgotPasswordSuccessAction
| IForgotPasswordFailedAction;