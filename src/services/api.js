export const API_URL = 'https://norma.nomoreparties.space';



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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}