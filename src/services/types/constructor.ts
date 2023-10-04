import { IIngredient } from "../../types/data";
import { ADD_INGREDIENT, DELETE_INGREDIENT, REARRANGE_INGREDIENTS, RESET_CONSTRUCTOR } from "../constaints/constructor";



export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT,
  readonly payload: IIngredient
}


export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT,
  readonly payload: string
}


export interface IRearrangeIngredientAction {
  readonly type: typeof REARRANGE_INGREDIENTS,
  readonly payload: {
    from: number,
    to: number
  }
}


export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR
}




export type TConstructorActions = IAddIngredientAction
  | IDeleteIngredientAction
  | IRearrangeIngredientAction
  | IResetConstructorAction;