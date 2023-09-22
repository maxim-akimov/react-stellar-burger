import React, {useState} from "react";


import styles from "./profile.module.css";
import {Link, NavLink, redirect} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {sendUserUpdateRequest} from "../utils/api";
import {SET_USER_UPDATE_FAILED, SET_USER_UPDATE_REQUEST, SET_USER_UPDATE_SUCCESS} from "../services/actions/user-update";
import {logOut, setUser} from "../services/actions/autentication";


function Profile() {
  const dispatch = useDispatch();
  const {name, email} = useSelector((store) => store.user.user);

  const initialFormState = {
    name: name,
    email: email,
    password: ''
  }
  const [form, setValues] = useState(initialFormState)

  const [isChange, setChange] = useState(false);


  const handleFormChange = (e) => {
    setValues({...form, [e.target.name]: e.target.value})
    setChange(true);
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: SET_USER_UPDATE_REQUEST
    })

    sendUserUpdateRequest({
      name: form.name,
      email: form.email,
      password: form.password,
    })
      .then((res) => {
        if (res && res.success) {
          setUser(res.user)
          dispatch({type: SET_USER_UPDATE_SUCCESS})
          setChange(false);
        }
      })
      .catch((e, res) => {
        dispatch({
          type: SET_USER_UPDATE_FAILED,
          data: e.message
        })
        console.error(e)
      })
  }


  const handleCancelClick = () => {
    setValues(initialFormState)
    setChange(false);
  }


  const handleLogoutClick = () => {
    dispatch(logOut())
      .then(() => {
        redirect('/login');
      });
  }


  return (
    <>

      <main className={`pt-30 ${styles.main}`}>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menu__item}>
              <NavLink
                to={`/profile`}
                className={({isActive}) => 'text text_type_main-medium ' + styles.menu__link + (isActive ? ' ' + styles.menu__link_active : '')}>
                Профиль
              </NavLink>
            </li>
            <li className={`text text_type_main-medium ${styles.menu__item}`}>
              <NavLink
                to={'/profile/orders'}
                className={({isActive}) => 'text text_type_main-medium ' + styles.menu__link + (isActive ? ' ' + styles.menu__link_active : '')}>
                История заказов
              </NavLink>
            </li>
            <li className={`text text_type_main-medium ${styles.menu__item}`}>
              <Link
                onClick={handleLogoutClick}
                className={`text text_type_main-medium ${styles.menu__link}`}
              >Выход</Link>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleFormSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleFormChange}
            value={form.name}
            name={'name'}
            icon="EditIcon"
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />

          <EmailInput
            onChange={handleFormChange}
            value={form.email}
            name={'email'}
            extraClass="pt-6"
            icon="EditIcon"
            isIcon={true}
          />

          <PasswordInput
            onChange={handleFormChange}
            value={form.password}
            name={'password'}
            extraClass="pt-6"
            icon="EditIcon"
          />
          {(isChange && <div className={`pt-6 ${styles.buttons}`}>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
            <Button htmlType="button" type="secondary" size="medium" onClick={handleCancelClick}>
              Отмена
            </Button>
          </div>)}
        </form>


        <p className={`text text_type_main-default text_color_inactive pt-4 ${styles.hint}`}>
          В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные&nbsp;данные
        </p>
      </main>
    </>
  );
}


export default Profile;
