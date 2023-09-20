import React, {useState} from "react";


import styles from "./profile.module.css";
import {Link, NavLink} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";


function Profile() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

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
              <NavLink
                to={'/'}
                className={({isActive}) => 'text text_type_main-medium ' + styles.menu__link + (isActive ? ' ' + styles.menu__link_active : '')}
              >Выход</NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValues({...values, name: e.target.value})}
            value={values.name}
            name={'name'}
            icon="EditIcon"
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />

          <EmailInput
            onChange={e => setValues({...values, email: e.target.value})}
            value={values.email}
            name={'email'}
            isIcon={true}
            extraClass="pt-6"
            icon="EditIcon"
          />

          <PasswordInput
            onChange={e => setValues({...values, password: e.target.value})}
            value={values.password}
            name={'password'}
            isIcon={true}
            extraClass="pt-6"
            icon="EditIcon"
          />
        </section>


        <p className={`text text_type_main-default text_color_inactive pt-4 ${styles.hint}`}>
          В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные&nbsp;данные
        </p>
      </main>
    </>
  );
}


export default Profile;
