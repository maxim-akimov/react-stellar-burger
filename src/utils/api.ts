import { API_URL, API_OPTIONS } from "./constaints";
import {
  IForgotPassword, IIngredient,
  IIngredientsList, ILogin, ILogout, IOrder,
  IRegister,
  IResetPassword, IUser
} from "../types/data";
import { IRefreshTokenResponse, TResponseBody } from "../types/api";


export const checkResponse = <K extends string | undefined, T>
(response: Response): Promise<TResponseBody<K, T>> => {
  console.log(response)
  if (response.ok) {
    console.log('json', response.json())
    return response.json();
  }
  return response.json()
    .then((res) => {
      if (res.message) {
        return res;
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}


const checkSuccess = <K extends string | undefined, T>
(response: TResponseBody<K, T>)
  : TResponseBody<K, T> | Promise<TResponseBody<K, T>> => {
  console.log('////////////', response)
  if (response.success) {
    return response;
  }

  return Promise.reject(response);
}


const request = <K extends string | undefined = '', T = {}> (endpoint: string, options?: RequestInit)
  : Promise<TResponseBody<K, T>> => {
  return fetch(`${API_URL}/${endpoint}`, { ...API_OPTIONS, ...options })
    .then(checkResponse<K, T>)
    .then(checkSuccess<K, T>)
}


export const sendRefreshTokenRequest = () => request<undefined, IRefreshTokenResponse>('auth/token', {
  method: 'POST',
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken') as string
  })
})


const requestWithAuth = <K extends string = '', T = {}>
(endpoint: string, options?: RequestInit)
  : Promise<TResponseBody<K, T>> => {
  // Отправка запроса на сервер
  return request<K, T>(endpoint, {
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


export const getIngredientsRequest = () => request<'ingredients', ReadonlyArray<IIngredient>>('ingredients');


export const getUserRequest = () => requestWithAuth<'user', IUser>('auth/user')


export const getOrderDetailsRequest = (value: number) => request<'orders', ReadonlyArray<IOrder>>(`orders/${value}`)


export const createOrderRequest = (data: IIngredientsList) => requestWithAuth<'order', IOrder>('orders', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const forgotPasswordRequest = (data: IForgotPassword) => request<undefined, {}>('password-reset', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const resetPasswordRequest = (data: IResetPassword) => request<undefined, {}>('password-reset/reset', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const registerRequest = (data: IRegister) => request<'user', IUser>('auth/register', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const updateUserRequest = (data: IRegister) => requestWithAuth<'user', IUser>('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(data),
})


export const loginRequest = (data: ILogin) => request<'user', IUser>('auth/login', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const logoutRequest = (data: ILogout) => request<undefined, {}>('auth/logout', {
  method: 'POST',
  body: JSON.stringify(data),
})