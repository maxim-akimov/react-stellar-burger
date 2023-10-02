import { FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";

import { SET_REGISTER_FAILED, SET_REGISTER_REQUEST, SET_REGISTER_SUCCESS } from "../../services/actions/register";
import { ERROR_MESSAGES } from "../../utils/constaints";
import { sendRegisterRequest } from "../../utils/api";
import { setUser } from "../../services/actions/autentication";


export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerErrorMessage, registerFailed } = useSelector(state => state.register);

  const [values, handleChange] = useForm({});


  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch({
      type: SET_REGISTER_REQUEST
    })

    sendRegisterRequest(values)
      .then((res) => {
        if (res && res.success) {
          setUser(res.user)

          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);

          dispatch({ type: SET_REGISTER_SUCCESS })
          navigate('/');
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_REGISTER_FAILED,
          data: ERROR_MESSAGES[err.message]
        })
        console.error(err)
      })
  }

  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium pt-10 pb-5`}>
        Регистрация
      </h1>
      <form onSubmit={handleRegisterSubmit}>
        {
          (registerFailed) &&
          <p className={'text text_type_main-default pt-6 pb-6'}>
            {registerErrorMessage}
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
