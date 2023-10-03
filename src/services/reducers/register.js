import {
  SET_REGISTER_REQUEST,
  SET_REGISTER_SUCCESS,
  SET_REGISTER_FAILED
} from "../constaints/register";

const initialState = {
  registerRequest: false,
  registerFailed: false,
  registerErrorMessage: '',
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }

    case SET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
      };
    }

    case SET_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
        registerErrorMessage: action.data
      };
    }

    default: {
      return state;
    }
  }
}