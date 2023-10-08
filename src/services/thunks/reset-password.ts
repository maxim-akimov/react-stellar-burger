import { resetPasswordRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import { IResetPassword } from "../../types/data";
import {
  resetPasswordFailedAction,
  resetPasswordRequestAction,
  resetPasswordSuccessAction
} from "../actions/reset-password";



export const resetPasswordThunk: AppThunk = (data: IResetPassword) => (dispatch: AppDispatch) => {
  dispatch(resetPasswordRequestAction());

  resetPasswordRequest(data)
    .then((res) => {
      dispatch(resetPasswordSuccessAction());

      localStorage.removeItem('isEmailChecked');
    })
    .catch((e) => {
      dispatch(resetPasswordFailedAction(e.message))
    })
}

