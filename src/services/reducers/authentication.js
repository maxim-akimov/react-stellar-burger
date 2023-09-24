import {
  SET_USER,
  SET_AUTH_CHECKED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../actions/autentication";

const initialState = {
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
  user: null,
  loginRequest: false,
  loginFailed: false,
  loginError: null
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }

    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userFailed: false
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        loginError: action.payload
      };
    }

    default: {
      return state;
    }
  }
}