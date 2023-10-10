import { TIngredientDetailsActions } from "../types/ingredient-details";
import { IIngredient } from "../../types/data";
import { RESET_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from "../constaints/ingredient-details";


const initialState: IIngredient | null = null;

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return action.payload;
    }

    case RESET_INGREDIENT_DETAILS: {
      return null;
    }

    default: {
      return state;
    }
  }
}