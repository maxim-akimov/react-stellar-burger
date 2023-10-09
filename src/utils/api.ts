import { API_URL, API_OPTIONS } from "./constaints";
import {
  IForgotPassword,
  IIngredientsList, ILogin, ILogout,
  IRegister,
  IResetPassword,
} from "../types/data";
import { IFetchOptions, TCustomFetchOptions } from "../types/api";


export const checkResponse = (response) => {
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


const checkSuccess = (response: any) => {
  console.log('////////////', response)
  if (response.success) {
    return response;
  }

  return Promise.reject(response);
}


const  request = <T>(endpoint: string, options?: TCustomFetchOptions<>) => {
  return fetch(`${API_URL}/${endpoint}`, { ...API_OPTIONS, ...options })
    .then(checkResponse)
    .then(checkSuccess)
}


export const sendRefreshTokenRequest = () => request('auth/token', {
  method: 'POST',
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken')
  })
})


// Обертка для запросов, требующих проверку токена
const requestWithAuth = (endpoint: string, options?: any) => {
  // Отправка запроса на сервер
  return request(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
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
                authorization: localStorage.getItem('accessToken'),
              },
              ...options,
            })
          }) // then
      } // if (err.message === "jwt expired")

      return Promise.reject(err);
    }) // catch
}

export const getIngredientsRequest = () => request('ingredients');
export const getUserRequest = () => requestWithAuth('auth/user')
export const getOrderDetailsRequest = (value: number) => request(`orders/${value}`)


export const createOrderRequest = (data: IIngredientsList) => requestWithAuth('orders', {
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


export const registerRequest = (data: IRegister) => request('auth/register', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const updateUserRequest = (data: IRegister) => requestWithAuth('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(data),
})


export const loginRequest = (data: ILogin) => request('auth/login', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const logoutRequest = (data: ILogout) => request('auth/logout', {
  method: 'POST',
  body: JSON.stringify(data),
})