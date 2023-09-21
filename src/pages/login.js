import React, {useState} from "react";

import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from "./login.module.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  logIn,
  LOGIN_FAILED,
  LOGIN_REQUEST,
} from "../services/actions/autentication";


function Login() {
  const [form, setValues] = useState({
    email: '',
    password: '',
  })

  const {loginFailed, loginError} = useSelector(state => state.user);


  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch({type: LOGIN_REQUEST});

    dispatch(logIn(form))
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err.message
        })
      });
  }

  return (
    <>
      <main className={styles.main} onSubmit={handleLoginSubmit}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Вход
        </h1>
        <form onSubmit={handleLoginSubmit}>
          {
            (loginFailed) &&
            <p className={'text text_type_main-default pt-6 pb-6'}>
              {loginError}
            </p>
          }
          <EmailInput
            onChange={e => setValues({...form, email: e.target.value})}
            value={form.email}
            name={'email'}
            isIcon={false}
          />
          <PasswordInput
            onChange={e => setValues({...form, password: e.target.value})}
            value={form.password}
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
    </>
  );
}


export default Login;
