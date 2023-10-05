import { IResetIngredientDetailsAction, ISetIngredientDetailsAction } from "../types/ingredient-details";
import { RESET_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from "../constaints/ingredient-details";
import { IIngredient } from "../../types/data";


export const setIngredientDetailsAction = (value: IIngredient): ISetIngredientDetailsAction => ({
  type: SET_INGREDIENT_DETAILS,
  payload: value,
})


export const resetIngredientDetailsAction = (value: IIngredient): IResetIngredientDetailsAction => ({
  type: RESET_INGREDIENT_DETAILS,
})