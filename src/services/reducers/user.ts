import {
  SET_USER,
  SET_AUTH_CHECKED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../constaints/user";
import { IUser } from "../../types/data";
import { TUserActions } from "../types/user";
import { IRequestState } from "../types";

interface IUserState {
  user: IUser | null,
  requestState: IRequestState,
  authentication: {
    isAuthChecked: boolean,
    login: {
      requestState: IRequestState
    },
    logout: {
      requestState: IRequestState
    }
  }
}

const initialState: IUserState = {
  user: null,
  requestState: {
    request: false,
    success: false,
    failed: false
  },
  authentication: {
    isAuthChecked: false,
    login: {
      requestState: {
        request: false,
        success: false,
        failed: false
      },
    },
    logout: {
      requestState: {
        request: false,
        success: false,
        failed: false
      },
    }
  }
};


export const userReducer = (state = initialState, action: TUserActions) => {
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
        authentication: {
          ...state.authentication,
          iasAuthChecked: action.payload
        }
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true,
        }
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
          failed: false,
        }
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: false,
          failed: true,
          errorMessage: action.payload
        }
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          login: {
            ...state.authentication.login,
            requestState: {
              ...state.authentication.login.requestState,
              request: true,
            }
          }
        }
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          login: {
            ...state.authentication.login,
            requestState: {
              ...state.authentication.login.requestState,
              request: false,
              success: true,
            }
          }
        }
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          login: {
            ...state.authentication.login,
            requestState: {
              ...state.authentication.login.requestState,
              request: false,
              failed: true,
            }
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}