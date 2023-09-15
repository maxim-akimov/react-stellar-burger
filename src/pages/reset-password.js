import React, {useState} from "react";

import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";
import {Link} from "react-router-dom";


function ResetPassword() {
  const [values, setValues] = useState({
    password: '',
    passwordConfirm: 'password-confirm'
  })

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Восстановление пароля
        </h1>

        <PasswordInput
          onChange={e => setValues({...values, password: e.target.value})}
          value={values.password}
          name={'password'}
          extraClass="pt-6"
        />

        <PasswordInput
          onChange={e => setValues({...values, passwordConfirm: e.target.value})}
          value={values.passwordConfirm}
          name={'password-confirm'}
          extraClass={"pt-6"}
        />

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Сохранить
        </Button>

        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы? <Link class={styles.link}>войти</Link>
        </p>
      </main>
    </>
  );
}


export default ResetPassword;
