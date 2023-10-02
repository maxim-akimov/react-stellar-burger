import React, { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

import {
  SET_USER_UPDATE_FAILED,
  SET_USER_UPDATE_REQUEST,
  SET_USER_UPDATE_SUCCESS
} from "../../services/actions/user-update";
import { sendUserUpdateRequest } from "../../utils/api";
import { setUser } from "../../services/actions/autentication";


export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const [values, handleChange, setValues] = useForm({});
  const [isChange, setChange] = useState(false);

  useEffect(() => {
    setValues({ ...user, password: '' })
  }, [])

  const handleFormChange = (e) => {
    handleChange(e);
    setChange(true);
  }


  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch({
      type: SET_USER_UPDATE_REQUEST
    })

    sendUserUpdateRequest(values)
      .then((res) => {
        if (res && res.success) {
          setUser(res.user)
          dispatch({ type: SET_USER_UPDATE_SUCCESS })
          setChange(false);
        }
      })
      .catch((e) => {
        dispatch({
          type: SET_USER_UPDATE_FAILED,
          data: e.message
        })
        console.error(e)
      })
  }


  const handleCancelClick = () => {
    setChange(false);
  }


  return (
    <form onSubmit={handleFormSubmit} className={'pt-30'}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleFormChange}
        value={values.name || ''}
        name={'name'}
        icon="EditIcon"
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />

      <EmailInput
        onChange={handleFormChange}
        value={values.email || ''}
        name={'email'}
        extraClass="pt-6"
        icon="EditIcon"
        isIcon={true}
      />

      <PasswordInput
        onChange={handleFormChange}
        value={values.password || ''}
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
  );
}
