import { FC, FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import {useDispatch} from "../../services/hooks/useDispatch";
import {useSelector} from "../../services/hooks/useSelector";
import { useForm } from "../../services/hooks/useForm";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";

import { registerThunk } from "../../services/thunks/register";


export const Register: FC = () => {
  const dispatch = useDispatch();

  const { requestState } = useSelector(state => state.register);

  const [values, handleChange] = useForm({});


  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(registerThunk(values))
  }


  if (requestState.success) return <Navigate to={'/'} />;


  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Регистрация
      </h1>
      <form onSubmit={handleRegisterSubmit}>
        {
          (requestState.failed) &&
          <p className={'text text_type_main-default pt-6 pb-6'}>
            {requestState.errorMessage}
          </p>
        }
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name || ''}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

        <EmailInput
          onChange={handleChange}
          value={values.email || ''}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password || ''}
          name={'password'}
          extraClass="pt-6"
        />

        <Button htmlType="submit" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Зарегистрироваться
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированы? <Link to={'/login'} className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
