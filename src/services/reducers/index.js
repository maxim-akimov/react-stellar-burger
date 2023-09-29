import { combineReducers } from "redux";
import { burgerIngredientsReducer } from './burger-ingredients';
import {burgerConstructorReducer} from "./burger-constructor";
import {currentIngredientReducer} from "./ingredient";
import {orderReducer} from "./order";
import {forgotPasswordReducer} from "./forgot-password";
import {resetPasswordReducer} from "./reset-password";
import {registerReducer} from "./register";
import {authenticationReducer} from "./authentication";
import {userUpdateReducer} from "./user-update";
import {ordersReducer} from "./ws";
import {orderDetailsReducer} from "./order-details";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  register: registerReducer,
  user: authenticationReducer,
  userUpdate: userUpdateReducer,
  ws: ordersReducer,
  orderDetails: orderDetailsReducer,
})