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
  readonly uuid?: string,
  readonly index?: number
}


export interface IIngredientsList {
  readonly ingredients: ReadonlyArray<string>
}


export interface IIngredientConstructor extends IIngredient {
  readonly uuid: string
}


export interface IConstructorListItemProps extends Omit<IIngredientConstructor,
  '_id' | 'type' | 'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image_mobile' | 'image_large' | '__v'> {
  readonly findCard: (uuid: string) => IIngredient,
  readonly moveCard: (uuid: string, atIndex: number) => void
}


export interface IIngredientCard extends Omit<IIngredientConstructor,
  'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image_mobile' | 'image_large' | '__v'> {
}


export interface IFindCard extends IIngredientConstructor {
  readonly index: number
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

