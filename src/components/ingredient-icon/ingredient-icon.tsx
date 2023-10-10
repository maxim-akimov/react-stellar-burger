// Библиотеки
import { FC } from "react";

// Стили
import styles from './ingredient-icon.module.css'


interface TIngredientIcon {
  readonly src: string,
  readonly alt: string,
  readonly more?: boolean | number,
}


export const IngredientIcon: FC<TIngredientIcon> = ({ src, alt, more }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.image}/>
      {(more && more > 0 && <div className={`text text_type_digits-default ${styles.more}`}>+{more}</div>)}
    </div>
  );
}