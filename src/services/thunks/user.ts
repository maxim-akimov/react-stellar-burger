import { AppDispatch, AppThunk } from "../types";
import { getUserRequest, sendLoginRequest, sendLogoutRequest } from "../../utils/api";
import { setAuthCheckedAction, setUserAction } from "../actions/user";


export const getUserThunk: AppThunk = () => (dispatch: AppDispatch) => {
  return getUserRequest()
    .then((res) => {
      dispatch(setUserAction(res.user))
    })
}


export const loginThunk: AppThunk = (data) => (dispatch: AppDispatch) => {
  return sendLoginRequest(data)
    .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUserAction(res.user));
      dispatch(setAuthCheckedAction(true));
    });
};


export const logoutThunk: AppThunk = () => (dispatch: AppDispatch) => {
    return sendLogoutRequest({
      token: localStorage.getItem('refreshToken')
    }).then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUserAction(null));
    });
  };


export const checkUserAuthThunk: AppDispatch = () => (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserThunk())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUserAction(null));
        })
        .finally(() => dispatch(setAuthCheckedAction(true)));
    } else {
      dispatch(setUserAction(null));
      dispatch(setAuthCheckedAction(true));
    }
  };

