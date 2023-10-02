import {
  WS_CLOSE,
  WS_CONNECT,
  WS_CONNECTING,
  WS_DISCONNECT,
  WS_ERROR,
  WS_MESSAGE,
  WS_OPEN
} from "../services/actions/ws";

export const modalRoot: HTMLElement | null = document.getElementById('modal-root');

export const WebsocketStatus  = {
  CONNECTING:  'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const websocketActions = {
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  wsConnecting: WS_CONNECTING,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE
};

export const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_URL = 'wss://norma.nomoreparties.space/orders';
export const API_OPTIONS = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}

export const ERROR_MESSAGES = {
  'email or password are incorrect': 'Некорректно указан логин или пароль',
  'Email, password and name are required fields': 'Поля email, имя и пароль обязательны для заполнения',
  'User already exists': 'Пользователь с таким адресом электронной почты уже зарегистрирован',
  'Incorrect reset token': 'Некорректный токен',
  'Invalid credentials provided': 'Предоставлены неверные учетные данные'
}