import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../register/register.module.css";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  SET_RESET_PASSWORD, SET_RESET_PASSWORD_FAILED,
  SET_RESET_PASSWORD_REQUEST,
  SET_RESET_PASSWORD_SUCCESS
} from "../../services/actions/reset-password";
import {sendResetPasswordRequest} from "../../utils/api";
import {useForm} from "../../hooks/useForm";


function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {resetPasswordFailed} = useSelector(state => state.resetPassword);
  const [values, handleChange] = useForm({});


  if (!localStorage.getItem('isEmailChecked')) {
    return <Navigate to={'/'}/>
  }


  const handleResetPasswordSubmit = (e) => {
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
      .catch((e) => {
        dispatch({
          type: SET_RESET_PASSWORD_FAILED
        })
        console.error(e)
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
            Во время выполнения запроса произошла ошибка. Проверьте данные в форме и повторите попытку.
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


export default ResetPassword;