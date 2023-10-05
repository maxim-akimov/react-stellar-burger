import { RESET_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from "../constaints/ingredient-details";
import { IIngredient } from "../../types/data";


export interface ISetIngredientDetailsAction {
  readonly type: typeof SET_INGREDIENT_DETAILS,
  readonly payload: IIngredient
}


export interface IResetIngredientDetailsAction {
  readonly type: typeof RESET_INGREDIENT_DETAILS
}


export type TIngredientDetailsActions = ISetIngredientDetailsAction | IResetIngredientDetailsAction;