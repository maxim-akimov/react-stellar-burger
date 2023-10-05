import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from "../constaints/reset-password";
import {
  IResetPasswordFailedAction,
  IResetPasswordRequestAction,
  IResetPasswordSuccessAction
} from "../types/reset-password";


export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST,
})


export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
})


export const resetPasswordFailedAction = (value: string): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED,
  payload: value
})