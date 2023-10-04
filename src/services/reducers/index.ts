import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredients';
import {constructorReducer} from "./constructor";
import {currentIngredientReducer} from "./ingredient";
import {forgotPasswordReducer} from "./forgot-password";
import {resetPasswordReducer} from "./reset-password";
import {registerReducer} from "./register";
import { userReducer } from "./user";
import {orderDetailsReducer} from "./order-details";
import { authenticationReducer } from "./authentication";
import { createOrderReducer } from "./create-order";



export const rootReducer = combineReducers({
  user: userReducer,
  authentication: authenticationReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: createOrderReducer,
  register: registerReducer,
  orderDetails: orderDetailsReducer,
})