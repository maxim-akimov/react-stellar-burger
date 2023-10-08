import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector } from "../../services/hooks/useSelector";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useForm } from "../../services/hooks/useForm";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

import { updateUserThunk } from "../../services/thunks/user";


export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, updateRequestState } = useSelector((store) => store.user);
  const [values, handleChange, setValues] = useForm({});
  const [initialValues, setInitialValues] = useState({})
  const [isChange, setIsChange] = useState(false);


  useEffect(() => {
    setValues({ ...user, password: '' })
    setInitialValues({ ...user, password: '' })
  }, [])


  useEffect(() => {
    setIsChange(false);
  }, [updateRequestState.success])


  const handleFormChange = (e: FormEvent) => {
    handleChange(e);
    setIsChange(true);
  }


  const handleCancelClick = () => {
    setIsChange(false);
    setValues(initialValues);
  }


  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateUserThunk(values))
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
