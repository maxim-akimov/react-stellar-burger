import {
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  GET_BURGER_INGREDIENTS_REQUEST
} from "../actions/burger-ingredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  items: [],
  currentTab: 'one',
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }

    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        items: action.items,
      };
    }

    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }

    default: {
      return state;
    }
  }
}