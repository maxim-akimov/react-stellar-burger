import {
  SET_USER_UPDATE_REQUEST,
  SET_USER_UPDATE_SUCCESS,
  SET_USER_UPDATE_FAILED
} from "../actions/user-update";

const initialState = {
  userUpdateRequest: false,
  userUpdateFailed: false,
  userUpdateErrorMessage: '',
};

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_UPDATE_REQUEST: {
      return {
        ...state,
        userUpdateRequest: true,
        userUpdateFailed: false,
      };
    }

    case SET_USER_UPDATE_SUCCESS: {
      return {
        ...state,
        userUpdateRequest: false,
      };
    }

    case SET_USER_UPDATE_FAILED: {
      return {
        ...state,
        userUpdateFailed: true,
        userUpdateRequest: false,
        userUpdateErrorMessage: action.data
      };
    }

    default: {
      return state;
    }
  }
}