import { FC, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../register/register.module.css";

import {
  SET_RESET_PASSWORD, SET_RESET_PASSWORD_FAILED, SET_RESET_PASSWORD_REQUEST, SET_RESET_PASSWORD_SUCCESS
} from "../../services/constaints/reset-password";
import { ERROR_MESSAGES } from "../../utils/constaints";
import { sendResetPasswordRequest } from "../../utils/api";


export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetPasswordFailed, resetPasswordError } = useSelector(state => state.resetPassword);

  const [values, handleChange] = useForm({});


  if (!localStorage.getItem('isEmailChecked')) {
    return <Navigate to={'/'}/>
  }


  const handleResetPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch({
      type: SET_RESET_PASSWORD_REQUEST
    })

    sendResetPasswordRequest(values)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_RESET_PASSWORD,
            data: res
          })
          dispatch({
            type: SET_RESET_PASSWORD_SUCCESS
          })
          localStorage.removeItem('isEmailChecked');
          navigate('/login');
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_RESET_PASSWORD_FAILED,
          data: ERROR_MESSAGES[err.message]
        })
        console.error(err)
      })
  }


  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Восстановление пароля
      </h1>
      <form onSubmit={handleResetPasswordSubmit}>
        {
          (resetPasswordFailed) &&
          <p className={'text text_type_main-default'}>
            {resetPasswordError}
          </p>
        }
        <PasswordInput
          onChange={handleChange}
          value={values.password || ''}
          name={'password'}
          extraClass="pt-6"
        />
        <Input
          onChange={handleChange}
          value={values.token || ''}
          name={'token'}
          extraClass={"pt-6"}
          placeholder={'Код из письма'}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Сохранить
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль? <Link to={'/login'} className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
