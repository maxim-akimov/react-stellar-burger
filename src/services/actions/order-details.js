import {getOrderDetailsRequest} from "../../utils/api";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';


export function getOrderDetails(number) {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST
    })
    getOrderDetailsRequest(number)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: res
          })
        } else {
          dispatch({
            type: GET_ORDER_DETAILS_FAILED
          })
        }
      }).catch(err => {
      dispatch({
        type: GET_ORDER_DETAILS_FAILED
      })
    })
  }
}