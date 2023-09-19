import React, {useState} from "react";

import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  SET_RESET_PASSWORD, SET_RESET_PASSWORD_FAILED,
  SET_RESET_PASSWORD_REQUEST,
  SET_RESET_PASSWORD_SUCCESS
} from "../services/actions/reset-password";
import {sendResetPasswordRequest} from "../utils/api";


function ResetPassword() {
  const [form, setValues] = useState({
    password: '',
    token: ''
  })

  const {resetPasswordData, resetPasswordRequest, resetPasswordFailed} = useSelector(state => state.resetPassword);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleResetPasswordSend = () => {
    dispatch({
      type: SET_RESET_PASSWORD_REQUEST
    })

    sendResetPasswordRequest({
      password: form.password,
      token: form.token
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_RESET_PASSWORD,
            data: res
          })
          dispatch({
            type: SET_RESET_PASSWORD_SUCCESS
          })
          navigate('/login');
        }
      })
      .catch((e) => {
        dispatch({
          type: SET_RESET_PASSWORD_FAILED
        })
        console.error(e)
      })
  }



  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Восстановление пароля
        </h1>

        {
          (resetPasswordFailed) &&
          <p className={'text text_type_main-default'}>
            Во время выполнения запроса произошла ошибка. Проверьте данные в форме и повторите попытку.
          </p>
        }

        <PasswordInput
          onChange={e => setValues({...form, password: e.target.value})}
          value={form.password}
          name={'password'}
          extraClass="pt-6"
        />

        <Input
          onChange={e => setValues({...form, token: e.target.value})}
          value={form.token}
          name={'token'}
          extraClass={"pt-6"}
          placeholder={'Код из письма'}
        />

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'}
                onClick={handleResetPasswordSend}>
          Сохранить
        </Button>

        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль? <Link to={'/login'} className={styles.link}>Войти</Link>
        </p>
      </main>
    </>
  );
}


export default ResetPassword;
