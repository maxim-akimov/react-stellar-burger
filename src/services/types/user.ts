import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SET_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../constaints/user";
import { IUser } from "../../types/data";


export interface ISetUserAction {
  readonly type: typeof SET_USER,
  readonly payload: IUser | null
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


export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST,
}


export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS,
}


export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED,
  readonly payload: string
}


export type TUserActions =
  ISetUserAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;