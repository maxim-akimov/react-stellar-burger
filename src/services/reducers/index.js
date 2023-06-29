import { combineReducers } from "redux";
import { burgerIngredientsReducer } from './burger-ingredients';
import {burgerConstructorReducer} from "./burger-constructor";
import {currentIngredientReducer} from "./ingredient";
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
})