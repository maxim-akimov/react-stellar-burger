import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from "../constaints/reset-password";
import { IRequestState } from "../types";
import { TResetPasswordActions } from "../types/reset-password";


interface IResetPasswordState {
  requestState: IRequestState
}


const initialState: IResetPasswordState = {
  requestState: {
    request: false,
    success: false,
    failed: false,
    errorMessage: ''
  }
};


export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true,
        }
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
        }
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          failed: true,
          errorMessage: action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
}