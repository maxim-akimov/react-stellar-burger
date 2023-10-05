import { FC, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useForm } from "../../services/hooks/useForm";

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../register/register.module.css";

import { resetPasswordThunk } from "../../services/thunks/reset-password";


export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const [values, handleChange] = useForm({});

  const { requestState } = useSelector((state) => state.resetPassword);


  if (!localStorage.getItem('isEmailChecked')) return <Navigate to={'/'}/>;
  if (requestState.success) return <Navigate to={'/login'} />;


  const handleResetPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(resetPasswordThunk(values));
  }


  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Восстановление пароля
      </h1>
      <form onSubmit={handleResetPasswordSubmit}>
        {
          (requestState.failed) &&
          <p className={'text text_type_main-default'}>
            {requestState.errorMessage}
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
