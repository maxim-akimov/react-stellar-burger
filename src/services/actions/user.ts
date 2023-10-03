import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SET_USER, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS,
} from "../constaints/user";
import { IUser } from "../../types/data";
import {
  IGetUserFailedAction,
  IGetUserRequestAction,
  IGetUserSuccessAction,
  ISetUserAction, IUpdateUserFailedAction, IUpdateUserRequestAction, IUpdateUserSuccessAction
} from "../types/user";


export const setUserAction = (data: IUser | null): ISetUserAction => ({
  type: SET_USER,
  payload: data
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


export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
})


export const updateUserSuccessAction = (): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
})


export const updateUserFailedAction = (value: string): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
  payload: value,
})