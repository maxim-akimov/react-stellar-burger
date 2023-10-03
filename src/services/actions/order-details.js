import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  RESET_ORDER_DETAILS
} from "../constaints/order-details";
import { getOrderDetailsRequest } from "../../utils/api";


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