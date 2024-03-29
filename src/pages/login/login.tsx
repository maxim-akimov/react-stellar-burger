import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useForm } from "../../services/hooks/useForm";

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from "./login.module.css";

import { loginThunk } from "../../services/thunks/authentication";


export const Login: FC = () => {
  const dispatch = useDispatch();
  const [values, handleChange] = useForm({});
  const loginRequestState = useSelector(state => state.authentication.loginRequestState);


  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginThunk(values));
    /**
    dispatch({ type: LOGIN_REQUEST });

    dispatch(loginThunk(values))
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: ERROR_MESSAGES[err.message]
        })
      });*/
  }

  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Вход
      </h1>
      <form onSubmit={handleLoginSubmit}>
        {
          (loginRequestState.failed) &&
          <p className={'text text_type_main-default pt-6 pb-6'}>
            {loginRequestState.errorMessage}
          </p>
        }
        <EmailInput
          onChange={handleChange}
          value={values.email || ''}
          name={'email'}
          isIcon={false}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ''}
          name={'password'}
          extraClass="pt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={'mt-6 mb-20'}>
          Войти
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вы — новый пользователь? <Link to={'/register'} className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className={'text text_type_main-default text_color_inactive pt-4'}>
        Забыли пароль? <Link to={'/forgot-password'} className={styles.link}>Восстановить пароль</Link>
      </p>
    </main>
  );
}
