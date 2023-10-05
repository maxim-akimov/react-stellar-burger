import { string } from "prop-types";
import { retry } from "@reduxjs/toolkit/query";

export interface IIngredient {
  readonly _id: string,
  readonly name: string,
  readonly type: string,
  readonly proteins: number,
  readonly fat: number,
  readonly carbohydrates: number,
  readonly calories: number,
  readonly price: number,
  readonly image: string,
  readonly image_mobile: string,
  readonly image_large: string
}


export interface IIngredientsList {
  readonly ingredients: ReadonlyArray<string>
}


export interface IConstructorIngredient extends IIngredient {
  readonly uuid: string
}


export interface IDraggableIngredient extends IConstructorIngredient {
  readonly index?: number,
  readonly findCard: (uuid: string) => { card: IIngredient, index: number },
  readonly moveCard: (uuid: string, atIndex: number) => void
}


export interface IOrder {
  _id: string,
  status: string,
  number: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  ingredients: string[]
}


export interface IOrderItem extends IOrder {
  showStatus?: boolean
}


export interface IUser {
  email: string,
  name: string
}

