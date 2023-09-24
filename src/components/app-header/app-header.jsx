import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'


import styles from "./app-header.module.css";
import {Link, NavLink} from "react-router-dom";

function AppHeader() {


  return (
    <header className={`${styles.header} p-4`}>
      <div className={styles.content}>
        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <NavLink to={'/'} end
                       className={({isActive}) => 'text text_type_main-small pl-5 pr-5 pb-4 pt-4 '
                         + styles.link + (isActive ? ' ' + styles.link_active : '')}>
                {({isActive}) => (
                  <>
                    <BurgerIcon type={(isActive) ? 'primary' : 'secondary'}/>
                    Конструктор
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to={'/feed'} end
                       className={({isActive}) => 'text text_type_main-small pl-5 pr-5 pb-4 pt-4 '
                         + styles.link + (isActive ? ' ' + styles.link_active : '')}>
                {({isActive}) => (
                  <>
                    <ListIcon type={(isActive) ? 'primary' : 'secondary'}/>
                    Лента заказов
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Logo/>
        <NavLink to={'/profile'}
                 className={({isActive}) => 'text text_type_main-small pl-5 pr-5 pb-4 pt-4 '
                   + styles.link + (isActive ? ' ' + styles.link_active : '')}>
          {({isActive}) => (
            <>
              <ProfileIcon type={(isActive) ? 'primary' : 'secondary'}/>
              Личный кабинет
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
