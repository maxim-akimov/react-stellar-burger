import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SET_AUTH_CHECKED
} from "../constaints/authentication";
import {
  ILoginRequestAction,
  ILoginSuccessAction,
  ILoginFailedAction,
  ISetAuthCheckedAction, ILogoutRequestAction, ILogoutSuccessAction, ILogoutFailedAction,
} from "../types/authentication";


export const setAuthCheckedAction = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value
})


export const loginRequestAction = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
})


export const loginSuccessAction = (): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
})


export const loginFailedAction = (value: string): ILoginFailedAction => ({
  type: LOGIN_FAILED,
  payload: value,
})


export const logoutRequestAction = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST,
})


export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
})


export const logoutFailedAction = (value: string): ILogoutFailedAction => ({
  type: LOGOUT_FAILED,
  payload: value,
})