import { TUserActions } from "./user";
import { store } from '../store'
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TAuthenticationActions } from "./authentication";
import { TIngredientsActions } from "./ingredients";
import { TConstructorActions } from "./constructor";


export interface IRequestState {
  request: boolean,
  success: boolean,
  failed: boolean,
  errorMessage?: string
}


type TApplicationActions = TUserActions
  | TAuthenticationActions
  | TIngredientsActions
  | TConstructorActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;

// export type AppDispatch = typeof store.dispatch;