import {
  SET_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED
} from "../constaints/user";
import { IUser } from "../../types/data";
import { TUserActions } from "../types/user";
import { IRequestState } from "../types";



interface IUserState {
  user: IUser | null,
  requestState: IRequestState,
  updateRequestState: IRequestState,
}


const initialState: IUserState = {
  user: null,
  requestState: {
    request: false,
    success: false,
    failed: false,
    errorMessage: ''
  },
  updateRequestState: {
    request: false,
    success: false,
    failed: false,
    errorMessage: ''
  },
};


export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
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
        }
      };
    }

    case GET_USER_FAILED: {
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

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateRequestState: {
          ...state.updateRequestState,
          request: true,
        }
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateRequestState: {
          ...state.updateRequestState,
          request: false,
          success: true,
        }
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateRequestState: {
          ...state.updateRequestState,
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