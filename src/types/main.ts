import { Dispatch, FormEvent, SetStateAction } from "react";
import { IConstructorIngredient } from "./data";

export interface ITitlesPosition {
  [key: number]: number
}

export interface IUseFormHook {
  [name: string]: string
}

export type IUseFormHookReturn = [
  values: IUseFormHook,
  handleChange: (event: FormEvent) => void,
  setValues: Dispatch<SetStateAction<IUseFormHook>>,
];

export interface IFindCardReturn {
  card: IConstructorIngredient,
  index: number
}
