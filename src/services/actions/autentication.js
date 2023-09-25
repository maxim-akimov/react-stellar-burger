import {sendLoginRequest, sendLogoutRequest, sendRefreshTokenRequest, getUserRequest} from "../../utils/api";

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';



export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value
})


export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData
})


// Получение информации о пользователе по токену
const getUser = () => {
  return (dispatch) => {
    // Отправка запроса на получение информации с сервера
    return getUserRequest()
      .then((res) => {
        // Запись информации о пользователе в хранилище
        dispatch(setUser(res.user))
      })
      .catch((error) => {
          // Если пришло соообщение об истечении срока действия токена
          if (error.message === "jwt expired") {
            // Выполняем обновление токена
            return refreshToken()
              .then((refreshRes) => {
                if (refreshRes.success) {
                  localStorage.setItem('accessToken', refreshRes.accessToken);
                  localStorage.setItem('refreshToken', refreshRes.refreshToken);
                  getUserRequest()
                    .then((res) => {
                      dispatch(setUser(res.user))
                    })
                } else {
                  return Promise.reject(error);
                }
              })
          }
        }
      )
  }
}


export const logIn = (form) => {
  return (dispatch) => {
    return sendLoginRequest({
      email: form.email,
      password: form.password
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      });
  };
};


export const logOut = () => {
  return (dispatch) => {
    return sendLogoutRequest({
      token: localStorage.getItem('refreshToken')
    }).then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};


// Обновление токена
const refreshToken = () => {
  return sendRefreshTokenRequest();
}


//Проверка факта авторизации пользователя
export const checkUserAuth = () => {
  return (dispatch) => {
    //Если в локальном хранилище уже имеется токен
    if (localStorage.getItem('accessToken')) {
      //Отправляем запрос на получение данных о пользователе по текущему токену
      // (токен берем из локального хранилища и отправляем в заголовке запроса)
      // Полученная информация сохраняется в хранилище
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)))
    } else {
      dispatch(setAuthChecked(true));
    }
  }
}