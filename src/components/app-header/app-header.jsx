import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'


import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${styles.header} p-4`}>
      <div className={styles.content}>
        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <a href="#"
                 className={`text text_type_main-small pl-5 pr-5 pb-4 pt-4 ${styles.link} ${styles.link_active}`}>
                <BurgerIcon type="primary" />
                Конструктор
              </a>
            </li>
            <li className={styles.menu__item}>
              <a href="#"
                 className={`text text_type_main-small pl-5 pr-5 pb-4 pt-4 ${styles.link}`}>
                <ListIcon type="secondary" />
                Лента заказов
              </a>
            </li>
          </ul>
        </nav>
        <Logo />
        <a href="#"
           className={`text text_type_main-small pl-5 pr-5 pb-4 pt-4 ${styles.link} ${styles.link_lk}`}>
          <ProfileIcon  type="secondary" />
          Личный кабинет
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
