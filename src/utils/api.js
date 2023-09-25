const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_URL = 'wss://norma.nomoreparties.space/orders';
const API_OPTIONS = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('accessToken'),
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}


function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}


function checkSuccess(response) {
  if (response.success) {
    return response;
  }
  return Promise.reject(`Запрос к серверу завершился ошибкой: ${response}`);
}


function request(endpoint, options) {
  return fetch(`${API_URL}/${endpoint}`, {...API_OPTIONS, ...options})
    .then(checkResponse)
    .then(checkSuccess)
}


export const getBurgerIngredientsRequest = () => request('ingredients');
export const getUserRequest = () => request('auth/user')
export const getOrderDetailsRequest = (number) => request(`orders/${number}`)


export const sendOrderRequest = (data) => request('orders', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const sendForgotPasswordRequest = (data) => request('password-reset', {
  method: 'POST',
  body: JSON.stringify(data),
});


export const sendResetPasswordRequest = (data) => request('password-reset/reset', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const sendRegisterRequest = (data) => request('auth/register', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const sendUserUpdateRequest = (data) => request('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(data),
})


export const sendRefreshTokenRequest = () => request('auth/token', {
  method: 'POST',
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken')
  })
})


export const sendLoginRequest = (data) => request('auth/login', {
  method: 'POST',
  body: JSON.stringify(data),
})


export const sendLogoutRequest = (data) => request('auth/logout', {
  method: 'POST',
  body: JSON.stringify(data),
})