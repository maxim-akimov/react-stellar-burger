import {
  IGetIngredientsFailedAction,
  IGetIngredientsRequestAction,
  IGetIngredientsSuccessAction
} from "../types/ingredients";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../constaints/ingredients";
import { IIngredient } from "../../types/data";


export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
})


export const getIngredientsSuccessAction = (data: ReadonlyArray<IIngredient>): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data
})


export const getIngredientsFailedAction = (value: string): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
  payload: value,
})