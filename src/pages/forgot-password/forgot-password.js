import styles from "./forgot-password.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {sendForgotPasswordRequest} from "../../utils/api";
import {
  SET_FORGOT_PASSWORD, SET_FORGOT_PASSWORD_FAILED,
  SET_FORGOT_PASSWORD_REQUEST,
  SET_FORGOT_PASSWORD_SUCCESS
} from "../../services/actions/forgot-password";
import {useDispatch} from "react-redux";
import {useForm} from "../../hooks/useForm";


function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, handleChange] = useForm({});


  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: SET_FORGOT_PASSWORD_REQUEST
    })

    sendForgotPasswordRequest({
      email: values.email,
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_FORGOT_PASSWORD,
            data: res
          })

          dispatch({
            type: SET_FORGOT_PASSWORD_SUCCESS
          })

          localStorage.setItem('isEmailChecked', 'true');
          navigate('/reset-password');
        }
      })
      .catch((e) => {
        dispatch({
          type: SET_FORGOT_PASSWORD_FAILED
        })
        console.error(e)
      })
  }


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


export default ForgotPassword;