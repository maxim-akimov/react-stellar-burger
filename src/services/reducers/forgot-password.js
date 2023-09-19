import {
  SET_FORGOT_PASSWORD,
  SET_FORGOT_PASSWORD_REQUEST,
  SET_FORGOT_PASSWORD_SUCCESS,
  SET_FORGOT_PASSWORD_FAILED
} from "../actions/forgot-password";

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordData: {},
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPasswordData: action.data
      }
    }

    case SET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      };
    }

    case SET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
      };
    }

    case SET_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }

    default: {
      return state;
    }
  }
}