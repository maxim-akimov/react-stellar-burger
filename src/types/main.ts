import { Dispatch, FormEvent, SetStateAction } from "react";

export interface ITitlesPosition {
  readonly [key: number]: number
}

export interface IUseFormHook {
  [name: string]: string
}

export type IUseFormHookReturn = [
  IUseFormHook,
  (event: FormEvent) => void,
  Dispatch<SetStateAction<IUseFormHook>>
];
