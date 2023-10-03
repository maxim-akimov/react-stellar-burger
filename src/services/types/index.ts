import { TUserActions } from "./user";
import { store } from '../store'
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";



type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TUserActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
  >;

export type AppDispatch = typeof store.dispatch;

export interface IRequestState {
  request: boolean,
  success: boolean,
  failed: boolean,
  errorMessage?: string
}