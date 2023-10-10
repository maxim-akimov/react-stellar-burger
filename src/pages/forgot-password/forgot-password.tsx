import { FC, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useForm } from "../../services/hooks/useForm";

import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";


import { forgotPasswordThunk } from "../../services/thunks/forgot-password";


export const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const [values, handleChange] = useForm({});
  const { requestState } = useSelector((store) => store.forgotPassword);


  const handleForgotPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(values));
  }


  if (requestState.success) return <Navigate to={'/reset-password'} />;


  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Восстановление пароля
      </h1>
      <form onSubmit={handleForgotPasswordSubmit}>
        <EmailInput
          onChange={handleChange}
          value={values.email || ''}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Восстановить
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль? <Link to={'/login'} className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
