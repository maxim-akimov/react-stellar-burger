import {API_URL, API_OPTIONS} from "./constaints";
import { } from "../types/api";


export const checkResponse = (response) => {
  console.log(response)
  if (response.ok) {
    return response.json();
  }
  return response.json()
    .then((res:any) => {
      if (res.message) {
        return res;
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}


function checkSuccess(response: any) {
  if (response.success) {
    return response;
  }

  return Promise.reject(response);
}


function request(endpoint: string, options?: any) {
  return fetch(`${API_URL}/${endpoint}`, {...API_OPTIONS, ...options})
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
function requestWithAuth(endpoint: string, options?: any) {
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
export const getOrderDetailsRequest = (number) => request(`orders/${number}`)


export const createOrderRequest = (data) => requestWithAuth('orders', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const forgotPasswordRequest = (data) => request('password-reset', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const resetPasswordRequest = (data) => request('password-reset/reset', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const registerRequest = (data) => request('auth/register', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const updateUserRequest = (data) => requestWithAuth('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(data),
})


export const loginRequest = (data) => request('auth/login', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const logoutRequest = (data) => request('auth/logout', {
  method: 'POST',
  body: JSON.stringify(data),
})