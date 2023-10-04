import { v4 as uuidV4 } from 'uuid';
import { ADD_INGREDIENT, DELETE_INGREDIENT, REARRANGE_INGREDIENTS, RESET_CONSTRUCTOR } from "../constaints/constructor";
import { IIngredient } from "../../types/data";
import { TConstructorActions } from "../types/constructor";


interface IConstructorState {
  bun: IIngredient | null,
  other: ReadonlyArray<IIngredient>
}


const initialState: IConstructorState = {
  bun: null,
  other: []
};


export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: {
            ...action.payload,
          }
        }
      } else {
        return {
          ...state,
          other: [
            ...state.other,
            {
              ...action.payload,
              uuid: uuidV4(),
            }
          ]
        }
      }
    }

    case DELETE_INGREDIENT: {
      return {
        ...state,
        other: state.other.filter((element) => element.uuid !== action.payload)
      }
    }

    case REARRANGE_INGREDIENTS: {
      const ingredients = [...state.other];
      ingredients.splice(action.payload.to, 0, ingredients.splice(action.payload.from, 1)[0])
      return {
        ...state,
        other: ingredients,
      }
    }

    case RESET_CONSTRUCTOR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}