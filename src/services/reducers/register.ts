import { REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constaints/register";
import { TRegisterUserActions } from "../types/register";
import { IRequestState } from "../types";


interface IRegisterUserState {
  requestState: IRequestState
}
const initialState: IRegisterUserState = {
  requestState: {
    request: false,
    success: false,
    failed: false,
    errorMessage: '',
  }
};

export const registerReducer = (state = initialState, action: TRegisterUserActions) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true,
        }
      };
    }

    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
        }
      };
    }

    case REGISTER_USER_FAILED: {
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