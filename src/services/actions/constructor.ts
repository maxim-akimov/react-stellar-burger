import { IConstructorIngredient, IIngredient } from "../../types/data";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REARRANGE_INGREDIENTS,
  RESET_CONSTRUCTOR
} from "../constaints/constructor";
import {
  IAddIngredientAction,
  IDeleteIngredientAction,
  IRearrangeIngredientAction,
  IResetConstructorAction
} from "../types/constructor";

export const addIngredientAction = (value: IIngredient): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: value,
})


export const deleteIngredientAction = (value: string): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  payload: value,
})


export const rearrangeIngredientAction = ({from, to}: {from: number, to: number}): IRearrangeIngredientAction => ({
  type: REARRANGE_INGREDIENTS,
  payload: {
    from: from,
    to: to,
  },
})


export const resetConstructorAction = (): IResetConstructorAction => ({
  type: RESET_CONSTRUCTOR,
})