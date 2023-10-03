import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../constaints/user";
import { IUser } from "../../types/data";



export interface ISetUserAction {
  readonly type: typeof SET_USER,
  readonly payload: IUser | null
}

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED,
  readonly payload: boolean
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST,
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS,
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED,
  readonly payload: string
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


export type TUserActions = ISetUserAction
  | ISetAuthCheckedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction;