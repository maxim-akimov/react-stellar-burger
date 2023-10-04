export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT';

const initialState = {};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return action.ingredient;
    }

    case RESET_CURRENT_INGREDIENT: {
      return null;
    }

    default: {
      return state;
    }
  }
}