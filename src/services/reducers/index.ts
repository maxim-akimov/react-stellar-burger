import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredients';
import {constructorReducer} from "./constructor";
import {forgotPasswordReducer} from "./forgot-password";
import {resetPasswordReducer} from "./reset-password";
import {registerReducer} from "./register";
import { userReducer } from "./user";
import {orderDetailsReducer} from "./order-details";
import { authenticationReducer } from "./authentication";
import { createOrderReducer } from "./create-order";
import { ingredientDetailsReducer } from "./ingredient-details";
import { websocketReducer } from "./websocket";
import { burgerConstructorReducer } from "./burger-constructor";



export const rootReducer = combineReducers({
  user: userReducer,
  authentication: authenticationReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: createOrderReducer,
  register: registerReducer,
  orderDetails: orderDetailsReducer,
  websocket: websocketReducer
})