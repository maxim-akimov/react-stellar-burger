import { TUserActions } from "./user";
import { store } from '../store'
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TAuthenticationActions } from "./authentication";
import { TIngredientsActions } from "./ingredients";
import { TConstructorActions } from "./constructor";
import { TForgotPasswordActions } from "./forgot-password";
import { TCreateOrderActions } from "./create-order";
import { TOrderDetailsActions } from "./order-details";
import { TRegisterUserActions } from "./register";
import { TIngredientDetailsActions } from "./ingredient-details";
import { TResetPasswordActions } from "./reset-password";
import { TWebsocketActions } from "./websocket";


export interface IRequestState {
  request: boolean,
  success: boolean,
  failed: boolean,
  errorMessage?: string
}


type TApplicationActions = TUserActions
  | TAuthenticationActions
  | TIngredientsActions
  | TConstructorActions
  | TForgotPasswordActions
  | TCreateOrderActions
  | TOrderDetailsActions
  | TRegisterUserActions
  | TIngredientDetailsActions
  | TResetPasswordActions
  | TWebsocketActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;

// export type AppDispatch = typeof store.dispatch;