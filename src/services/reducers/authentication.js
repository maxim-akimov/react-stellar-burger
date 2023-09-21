import {
  SET_USER,
  SET_AUTH_CHECKED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_LOGIN,
} from "../actions/autentication";

const initialState = {
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
  user: {}
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }

    case SET_LOGIN: {
      return {
        ...state,
          //
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

    default: {
      return state;
    }
  }
}