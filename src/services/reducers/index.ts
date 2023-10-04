import { combineReducers } from "redux";
import { burgerIngredientsReducer } from './ingredients';
import {burgerConstructorReducer} from "./constructor";
import {currentIngredientReducer} from "./ingredient";
import {orderReducer} from "./order";
import {forgotPasswordReducer} from "./forgot-password";
import {resetPasswordReducer} from "./reset-password";
import {registerReducer} from "./register";
import { userReducer } from "./user";
import {ordersReducer} from "./ws";
import {orderDetailsReducer} from "./order-details";
import { authenticationReducer } from "./authentication";



export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  register: registerReducer,
  user: userReducer,
  ws: ordersReducer,
  orderDetails: orderDetailsReducer,
})