import {
  SET_REGISTER,
  SET_REGISTER_REQUEST,
  SET_REGISTER_SUCCESS,
  SET_REGISTER_FAILED
} from "../actions/register";

const initialState = {
  registerRequest: false,
  registerFailed: false,
  registerData: {},
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER: {
      return {
        ...state,
        registerData: action.data
      }
    }

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
      };
    }

    default: {
      return state;
    }
  }
}