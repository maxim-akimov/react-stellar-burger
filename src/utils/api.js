export const API_URL = 'https://norma.nomoreparties.space';
export const WS_URL = 'wss://norma.nomoreparties.space/orders';



export function getBurgerIngredientsRequest() {
  return fetch(`${API_URL}/api/ingredients`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}



export function sendOrderRequest(data) {
  return fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}



export function sendForgotPasswordRequest(data) {
  return fetch(`${API_URL}/api/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}



export function sendResetPasswordRequest(data) {
  return fetch(`${API_URL}/api/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}



export function sendRegisterRequest(data) {
  return fetch(`${API_URL}/api/auth/register `, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
}



export function sendUserUpdateRequest(data) {
  return fetch(`${API_URL}/api/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then((err) => {
          return Promise.reject(err);
        })    })
}



export function sendUserRequest() {
  return fetch(`${API_URL}/api/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then((err) => {
          return Promise.reject(err);
        })
    })
}



export function sendRefreshTokenRequest() {
  return fetch(`${API_URL}/api/auth/token `, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}



export function sendLoginRequest(data) {
  return fetch(`${API_URL}/api/auth/login `, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then((err) => {
          return Promise.reject(err);
        })
    })
}



export function sendLogoutRequest(data) {
  return fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then((err) => {
          return Promise.reject(err);
        })
    })
}






export function sendOrderDetailsRequest(number) {
  return fetch(`${API_URL}/api/orders/${number}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then((err) => {
          return Promise.reject(err);
        })
    })
}