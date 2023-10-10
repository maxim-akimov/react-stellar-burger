// Библиотеки
import { FC } from "react";

// Компоненты
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

// Стили
import styles from './preloader.module.css';


export const Preloader: FC<{ type?: string }> = ({ type }) => {
  return (
    <div className={`${styles.preloader} ${(type === 'modal') ? styles.preloader_type_modal : ''}`}>
      <BurgerIcon type="primary"/>
    </div>
  )
}