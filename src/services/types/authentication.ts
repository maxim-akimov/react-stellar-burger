import {
  SET_AUTH_CHECKED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "../constaints/authentication";


export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED,
  readonly payload: boolean
}


export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST,
}


export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS,
}


export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED,
  readonly payload: string
}


export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST,
}


export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS,
}


export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED,
  readonly payload: string
}


export type TAuthenticationActions =
  ISetAuthCheckedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction;