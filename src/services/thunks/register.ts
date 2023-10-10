import { AppDispatch, AppThunk } from "../types";
import { registerRequest } from "../../utils/api";
import { registerUserFailedAction, registerUserRequestAction, registerUserSuccessAction } from "../actions/register";


export const registerThunk: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(registerUserRequestAction());

  registerRequest(data)
    .then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch(registerUserSuccessAction());
    })
    .catch((e) => {
      dispatch(registerUserFailedAction(e.message));
    })
}

