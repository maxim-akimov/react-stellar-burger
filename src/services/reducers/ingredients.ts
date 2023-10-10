import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST
} from "../constaints/ingredients";
import { IRequestState } from "../types";
import { IIngredient } from "../../types/data";
import { TIngredientsActions } from "../types/ingredients";



interface IIngredientsState {
  data: ReadonlyArray<IIngredient>,
  currentTab: 'one' | 'two' | 'three',
  requestState: IRequestState
}


const initialState: IIngredientsState = {
  data: [],
  currentTab: 'one',
  requestState: {
    request: false,
    success: false,
    failed: false
  }
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true
        }
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
        },
        data: action.payload,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        requestState: {
          ...state.requestState,
          request: false,
          failed: true
        }
      };
    }

    default: {
      return state;
    }
  }
}