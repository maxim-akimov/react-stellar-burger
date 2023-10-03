import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
} from "../constaints/user";
import { IUser } from "../../types/data";
import {
  IGetUserFailedAction,
  IGetUserRequestAction,
  IGetUserSuccessAction,
  ILoginFailedAction,
  ILoginRequestAction,
  ILoginSuccessAction,
  ISetAuthCheckedAction,
  ISetUserAction
} from "../types/user";


export const setUserAction = (data: IUser | null): ISetUserAction => ({
  type: SET_USER,
  payload: data
})


export const setAuthCheckedAction = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value
})


export const getUserRequestAction = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST,
})


export const getUserSuccessAction = (): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
})


export const getUserFailedAction = (value: string): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
  payload: value,
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