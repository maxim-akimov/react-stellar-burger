import React, { useState, useRef } from "react";

import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from "./login.module.css";
import {Link} from "react-router-dom";




function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [pwdVisibility, setPwdVisibility] = useState({
    isVisible: false
  });

  const inputRef = useRef(null)

  const changeVisibility = () => {
    setPwdVisibility({
      isVisible: !pwdVisibility.isVisible
    })
  }

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Вход
        </h1>
        <EmailInput
          onChange={e => setValues({...values, email: e.target.value})}
          value={values.email}
          name={'email'}
          isIcon={false}
        />

        <PasswordInput
          onChange={e => setValues({...values, password: e.target.value})}
          value={values.password}
          name={'password'}
          extraClass="pt-6"
        />

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Войти
        </Button>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вы — новый пользователь? <Link class={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className={'text text_type_main-default text_color_inactive pt-4'}>
          Забыли пароль? <Link class={styles.link}>Восстановить пароль</Link>
        </p>
      </main>
    </>
  );
}


export default Login;
