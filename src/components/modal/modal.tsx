// Библиотеки
import { FC, useEffect } from "react";
import ReactDOM from "react-dom";

// Компоненты
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from "../modal-overlay/modal-overlay";

// Стили
import styles from './modal.module.css';

// Константы
import { modalRoot } from "../../utils/constaints";


interface IModalProps {
  onClose: () => void
}


export const Modal: FC<IModalProps> = (props) => {
  const { children, onClose } = props;


  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, []);


  if (!modalRoot) return null;


  return ReactDOM.createPortal(
    (
      <>
        <div className={` ${styles.container}`}>
          <button className={`${styles.close_btn}`} onClick={props.onClose}>
            <CloseIcon type="primary"/>
          </button>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <ModalOverlay onClose={props.onClose}></ModalOverlay>
      </>
    ),
    modalRoot
  );
}