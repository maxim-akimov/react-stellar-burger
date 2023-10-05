import { AppDispatch, AppThunk } from "../types";
import { registerRequest, sendRegisterRequest } from "../../utils/api";
import { setUserAction } from "../actions/user";
import { SET_REGISTER_FAILED, SET_REGISTER_SUCCESS } from "../constaints/register";
import { ERROR_MESSAGES } from "../../utils/constaints";
import { registerUserFailedAction, registerUserRequestAction, registerUserSuccessAction } from "../actions/register";


export const registerThunk: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(registerUserRequestAction());

  registerRequest()
    .then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch(registerUserSuccessAction());
    })
    .catch((e) => {
      dispatch(registerUserFailedAction(e));
    })
}


sendRegisterRequest(values)
  .then((res) => {
    if (res && res.success) {
      setUserAction(res.user)

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch({ type: SET_REGISTER_SUCCESS })
      navigate('/');
    }
  })
  .catch((err) => {
    dispatch({
      type: SET_REGISTER_FAILED,
      data: ERROR_MESSAGES[err.message]
    })
    console.error(err)
  })
}