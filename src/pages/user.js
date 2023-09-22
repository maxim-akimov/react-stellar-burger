import React from "react";


import styles from "./user.module.css";
import {Link, NavLink, Outlet, redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../services/actions/autentication";


function User() {
  const dispatch = useDispatch();


  const handleLogoutClick = () => {
    dispatch(logOut())
      .then(() => {
        redirect('/login');
      });
  }


  return (
    <>

      <main className={`${styles.main}`}>
        <nav className={'pt-30'}>
          <ul className={styles.menu}>
            <li className={styles.menu__item}>
              <NavLink
                end
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
        <section>
          <Outlet/>
        </section>

        <p className={`text text_type_main-default text_color_inactive pt-4 ${styles.hint}`}>
          В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные&nbsp;данные
        </p>
      </main>
    </>
  );
}


export default User;
