import { API_URL, API_OPTIONS } from "./constaints";
import {
  IForgotPassword,
  IIngredient,
  IIngredientsList,
  ILogin,
  ILogout,
  IOrder,
  IRegister,
  IResetPassword,
  IUser
} from "../types/data";
import { IRefreshTokenResponse, TResponseBody } from "../types/api";


const request = <T = {}, K extends string | undefined = undefined>(endpoint: string, options?: RequestInit)
  : Promise<TResponseBody<T, K>> => fetch(`${API_URL}/${endpoint}`, { ...API_OPTIONS, ...options })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .then((res) => {
        if (res.message) {
          return res;
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  })
  .then((response) => {
    if (response.success) {
      return response;
    }
    return Promise.reject(response);
  })


export const sendRefreshTokenRequest = () => request<IRefreshTokenResponse>('auth/token', {
  method: 'POST',
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken') as string
  })
})


const requestWithAuth = <T, K extends string | undefined = undefined>
(endpoint: string, options?: RequestInit)
  : Promise<TResponseBody<T, K>> => {
  // Отправка запроса на сервер
  return request<T, K>(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') as string,
    },
    ...options,
  })
    .catch((err) => {
      // Запрос вернулся с ошибкой
      // Ошибка - просроченный токен
      if (err.message === "jwt expired") {
        // Отправка запроса на обновление токена
        return sendRefreshTokenRequest()
          .then((response) => {
            // Токен успешно обновлен
            // Запись обновленного токена в хранилище
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("accessToken", response.accessToken);

            // Повторная попытка выполнить первоначальный запрос
            return request(endpoint, {
              headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken') as string,
              },
              ...options,
            })
          }) // then
      } // if (err.message === "jwt expired")

      return Promise.reject(err);
    }) // catch
}


export const getIngredientsRequest = () => request<ReadonlyArray<IIngredient>, 'data'>('ingredients');


export const getUserRequest = () => requestWithAuth<IUser, 'user'>('auth/user')


export const getOrderDetailsRequest = (value: number) => request<ReadonlyArray<IOrder>, 'orders'>(`orders/${value}`)


export const createOrderRequest = (data: IIngredientsList) => requestWithAuth<IOrder, 'order'>('orders', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const forgotPasswordRequest = (data: IForgotPassword) => request('password-reset', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const resetPasswordRequest = (data: IResetPassword) => request('password-reset/reset', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const registerRequest = (data: IRegister) => request<IRefreshTokenResponse & { user: IUser }>('auth/register', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const updateUserRequest = (data: IRegister) => requestWithAuth<IUser, 'user'>('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(data),
})


export const loginRequest = (data: ILogin) => request<IRefreshTokenResponse & { user: IUser }>('auth/login', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const logoutRequest = (data: ILogout) => request('auth/logout', {
  method: 'POST',
  body: JSON.stringify(data),
})