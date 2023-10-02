import { FC } from "react";

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './preloader.module.css';


export const Preloader: FC<{ type?: string }> = ({ type }) => {
  return (
    <div className={`${styles.preloader} ${(type === 'modal') ? styles.preloader_type_modal : ''}`}>
      <BurgerIcon type="primary"/>
    </div>
  )
}