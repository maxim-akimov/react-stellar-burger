import React, {useState} from "react";

import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  SET_REGISTER_FAILED,
  SET_REGISTER_REQUEST,
  SET_REGISTER_SUCCESS
} from "../services/actions/register";
import {sendRegisterRequest} from "../utils/api";
import {setUser} from "../services/actions/autentication";


function Register() {
  const {registerErrorMessage, registerFailed} = useSelector(state => state.register);

  const [form, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch();

  const navigate = useNavigate();



  const handleRegisterSend = () => {
    dispatch({
      type: SET_REGISTER_REQUEST
    })

    sendRegisterRequest({
      name: form.name,
      email: form.email,
      password: form.password,
    })
      .then((res) => {
        if (res && res.success) {
          setUser(res.user)

          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);

          dispatch({ type: SET_REGISTER_SUCCESS })
          navigate('/');
        }
      })
      .catch((e, res) => {
        dispatch({
          type: SET_REGISTER_FAILED,
          data: e.message
        })
        console.error(e)
      })
  }

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-medium pt-10 pb-5`}>
          Регистрация
        </h1>
        {
          (registerFailed) &&
          <p className={'text text_type_main-default pt-6 pb-6'}>
            Во время выполнения запроса произошла ошибка. {registerErrorMessage}
          </p>
        }
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

        <Button htmlType="button" type="primary" size="medium" extraClass={'mt-6 mb-20'} onClick={handleRegisterSend}>
          Зарегистрироваться
        </Button>

        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы? <Link to={'/login'} className={styles.link}>Войти</Link>
        </p>
      </main>
    </>
  );
}


export default Register;
