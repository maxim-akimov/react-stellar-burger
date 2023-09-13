import React, { useState, useRef } from "react";

import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'

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
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setValues({...values, email: e.target.value})}
          value={values.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

        <Input
          type={(pwdVisibility.isVisible) ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={e => setValues({...values, password: e.target.value})}
          icon={(pwdVisibility.isVisible) ? 'HideIcon' : 'ShowIcon'}
          value={values.password}
          name={'password'}
          error={false}
          ref={inputRef}
          onIconClick={changeVisibility}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="pt-6"
        />

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'}>

          Войти
        </Button>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вы — новый пользователь? <Link>Зарегистрироваться</Link>
        </p>
        <p className={'text text_type_main-default text_color_inactive pt-4'}>
          Забыли пароль? <Link>Зарегистрироваться</Link>
        </p>
      </main>
    </>
  );
}


export default Login;
