import { AppDispatch, AppThunk } from "../types";
import { getUserRequest, loginRequest, logoutRequest } from "../../utils/api";
import { getUserFailedAction, getUserSuccessAction, setUserAction } from "../actions/user";
import {
  loginFailedAction,
  loginRequestAction,
  loginSuccessAction,
  logoutFailedAction,
  logoutRequestAction,
  logoutSuccessAction,
  setAuthCheckedAction
} from "../actions/authentication";


export const loginThunk: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(loginRequestAction());

  return loginRequest(data)
    .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      dispatch(loginSuccessAction());
      dispatch(setUserAction(res.user));
      dispatch(setAuthCheckedAction(true));
    })
    .catch((e) => {
      dispatch(loginFailedAction(e))
    });
};


export const logoutThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequestAction());

  return logoutRequest({
    token: localStorage.getItem('refreshToken')
  }).then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(logoutSuccessAction());
    dispatch(setUserAction(null));
  })
    .catch((e) => {
      dispatch(logoutFailedAction(e))
    });
};


export const checkUserAuthThunk: AppThunk = () => (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    return getUserRequest()
      .then((res) => {
        dispatch(getUserSuccessAction())
        dispatch(setUserAction(res.user));
      })
      .catch((e) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        dispatch(getUserFailedAction(e));
        dispatch(setUserAction(null));
      })
      .finally(() => {
        dispatch(setAuthCheckedAction(true))
      });
  } else {
    dispatch(setUserAction(null));
    dispatch(setAuthCheckedAction(true));
  }
};

