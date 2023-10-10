// Библиотеки
import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

// Хуки
import { useSelector } from "../../services/hooks/useSelector";

// Компоненты
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

// Стили
import styles from "./app-header.module.css";


export const AppHeader: FC = () => {
  const { user } = useSelector((store) => store.user);


  return (
    <header className={`${styles.header} p-4`}>
      <div className={styles.content}>
        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <NavLink to={'/'} end
                       className={({ isActive }) => 'text text_type_main-small pl-5 pr-5 pb-4 pt-4 '
                         + styles.link + (isActive ? ' ' + styles.link_active : '')}>
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={(isActive) ? 'primary' : 'secondary'}/>
                    Конструктор
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to={'/feed'} end
                       className={({ isActive }) => 'text text_type_main-small pl-5 pr-5 pb-4 pt-4 '
                         + styles.link + (isActive ? ' ' + styles.link_active : '')}>
                {({ isActive }) => (
                  <>
                    <ListIcon type={(isActive) ? 'primary' : 'secondary'}/>
                    Лента заказов
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to={'/'}>
          <Logo/>
        </Link>
        <NavLink to={'/profile'}
                 className={({ isActive }) => 'text text_type_main-small pl-5 pr-5 pb-4 pt-4 '
                   + styles.link + (isActive ? ' ' + styles.link_active : '')}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={(isActive) ? 'primary' : 'secondary'}/>
              {(user && user.name) ? (user.name) : ('Личный кабинет')}
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
}
