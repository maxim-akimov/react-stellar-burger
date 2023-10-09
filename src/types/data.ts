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
  readonly image_large: string,
  readonly __v: number
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

export interface IRegister extends IUser{
  password: string
}

export interface ILogin {
  email: string,
  password: string
}

export interface IForgotPassword {
  email: string
}

export interface IAuthResponse {
  success: boolean,
  message: string
}

export interface IResetPassword {
  password: string,
  token: string
}

export interface ILogout {
  token: string
}