import styles from "./forgot-password.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import React, {useState} from "react";



function ForgotPassword() {
  const [values, setValues] = useState({
    email: '',
  })



  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Восстановление пароля
        </h1>
        <EmailInput
          onChange={e => setValues({...values, email: e.target.value})}
          value={values.email}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Восстановить
        </Button>

        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль? <Link to={'/login'} class={styles.link}>Войти</Link>
        </p>
      </main>
    </>
  );
}


export default ForgotPassword;
