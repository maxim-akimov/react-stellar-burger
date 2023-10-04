import { AppDispatch, AppThunk } from "../types";
import {
  forgotPasswordFailedAction,
  forgotPasswordRequestAction,
  forgotPasswordSuccessAction
} from "../actions/forgot-password";
import { forgotPasswordRequest } from "../../utils/api";


export const forgotPasswordThunk: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(forgotPasswordRequestAction());

  forgotPasswordRequest(data)
    .then(() => {
      dispatch(forgotPasswordSuccessAction());
      localStorage.setItem('isEmailChecked', 'true');
    })
    .catch((e) => {
      dispatch(forgotPasswordFailedAction(e))
    })
}