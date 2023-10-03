import { getUserRequest, updateUserRequest } from "../../utils/api";
import {
  getUserFailedAction,
  getUserRequestAction,
  getUserSuccessAction,
  setUserAction,
  updateUserFailedAction,
  updateUserRequestAction,
  updateUserSuccessAction
} from "../actions/user";

import { AppDispatch, AppThunk } from "../types";



export const getUserThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserRequestAction());

  return getUserRequest()
    .then((res) => {
      dispatch(getUserSuccessAction());
      dispatch(setUserAction(res.user));
    })
    .catch((e) => {
      dispatch(getUserFailedAction(e));
    })
}


export const updateUserThunk: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(updateUserRequestAction());

  return updateUserRequest(data)
    .then((res) => {
      dispatch(updateUserSuccessAction());
      dispatch(setUserAction(res.user));
    })
    .catch((e) => {
      dispatch(updateUserFailedAction(e));
    })
}



