import {v4 as uuidV4} from 'uuid';
import {ADD_IN_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR} from "../actions/burger-constructor";


const initialState = {
  bun: null,
  other: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IN_CONSTRUCTOR: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          bun: {
            ...action.ingredient,
          }
        }
      } else {
        return {
          ...state,
          other: [
            ...state.other,
            {
              ...action.ingredient,
              uuid: uuidV4(),
            }
          ]
        }
      }
    }

    case DELETE_FROM_CONSTRUCTOR: {
      return {
        ...state,
        other: state.other.filter((element) => element.uuid !== action.uuid)
      }
    }

    default: {
      return state;
    }
  }
}