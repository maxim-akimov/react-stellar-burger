import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SET_AUTH_CHECKED
} from "../constaints/authentication";
import { IRequestState } from "../types";
import { TAuthenticationActions } from "../types/authentication";



interface IUserState {
  isAuthChecked: boolean,
  loginRequestState: IRequestState,
  logoutRequestState: IRequestState
}


const initialState: IUserState = {
  isAuthChecked: false,
  loginRequestState: {
    request: false,
    success: false,
    failed: false
  },
  logoutRequestState: {
    request: false,
    success: false,
    failed: false
  },
};


export const authenticationReducer = (state = initialState, action: TAuthenticationActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequestState: {
          ...state.loginRequestState,
          request: true,
        }
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequestState: {
          ...state.loginRequestState,
          request: false,
          success: true,
        }
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequestState: {
          ...state.loginRequestState,
          request: false,
          failed: true,
          errorMessage: action.payload
        }
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequestState: {
          ...state.logoutRequestState,
          request: true,
        }
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequestState: {
          ...state.logoutRequestState,
          request: false,
          success: true,
        }
      };
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequestState: {
          ...state.logoutRequestState,
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