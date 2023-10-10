import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from "../constaints/ingredients";
import { IIngredient } from "../../types/data";


export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST,
}


export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly payload: ReadonlyArray<IIngredient>
}


export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED,
  readonly payload: string
}


export type TIngredientsActions = IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;