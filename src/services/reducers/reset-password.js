import {
  SET_RESET_PASSWORD,
  SET_RESET_PASSWORD_REQUEST,
  SET_RESET_PASSWORD_SUCCESS,
  SET_RESET_PASSWORD_FAILED
} from "../actions/reset-password";

const initialState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordData: {},
  resetPasswordError: '',
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordData: action.data
      }
    }

    case SET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }

    case SET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
      };
    }

    case SET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPasswordError: action.data
      };
    }

    default: {
      return state;
    }
  }
}