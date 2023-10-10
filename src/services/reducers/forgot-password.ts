import { IRequestState } from "../types";
import { TForgotPasswordActions } from "../types/forgot-password";
import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS
} from "../constaints/forgot-password";


interface IForgotPasswordState {
  requestState: IRequestState
}


const initialState: IForgotPasswordState = {
  requestState: {
    request: false,
    success: false,
    failed: false
  }
};

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true,
        }
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
        }
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          failed: true,
          errorMessage: action.payload,
        }
      };
    }

    default: {
      return state;
    }
  }
}