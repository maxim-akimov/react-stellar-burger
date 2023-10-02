import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from "./login.module.css";

import { logIn, LOGIN_FAILED, LOGIN_REQUEST } from "../../services/actions/autentication";
import { ERROR_MESSAGES } from "../../utils/constaints";


export const Login: FC = () => {
  const dispatch = useDispatch();
  const [values, handleChange] = useForm({});
  const user = useSelector(state => state.user);


  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch({ type: LOGIN_REQUEST });

    dispatch(logIn(values))
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: ERROR_MESSAGES[err.message]
        })
      });
  }

  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Вход
      </h1>
      <form onSubmit={handleLoginSubmit}>
        {
          (user.loginFailed) &&
          <p className={'text text_type_main-default pt-6 pb-6'}>
            {user.loginError}
          </p>
        }
        <EmailInput
          onChange={handleChange}
          value={values.email || ''}
          name={'email'}
          isIcon={false}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ''}
          name={'password'}
          extraClass="pt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Войти
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вы — новый пользователь? <Link to={'/register'} className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className={'text text_type_main-default text_color_inactive pt-4'}>
        Забыли пароль? <Link to={'/forgot-password'} className={styles.link}>Восстановить пароль</Link>
      </p>
    </main>
  );
}
