import React, {useState} from "react";

import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";
import {Link} from "react-router-dom";


function Register() {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Регистрация
        </h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValues({...form, name: e.target.value})}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

        <EmailInput
          onChange={e => setValues({...form, email: e.target.value})}
          value={form.email}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />

        <PasswordInput
          onChange={e => setValues({...form, password: e.target.value})}
          value={form.password}
          name={'password'}
          extraClass="pt-6"
        />

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Зарегистрироваться
        </Button>

        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы? <Link to={'/login'} class={styles.link}>Войти</Link>
        </p>
      </main>
    </>
  );
}


export default Register;