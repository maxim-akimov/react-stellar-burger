import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS
} from "../constaints/forgot-password";
import {
  IForgotPasswordFailedAction,
  IForgotPasswordRequestAction,
  IForgotPasswordSuccessAction
} from "../types/forgot-password";



export const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({
  type: FORGOT_PASSWORD_REQUEST,
})


export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
})


export const forgotPasswordFailedAction = (value: string): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
  payload: value
})