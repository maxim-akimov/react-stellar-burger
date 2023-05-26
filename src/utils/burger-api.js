export const API_URL = 'https://norma.nomoreparties.space';



export function getIngredients() {
  return fetch(`${API_URL}/api/ingredients`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}