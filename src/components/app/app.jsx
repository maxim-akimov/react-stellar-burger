import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import Home from "../../pages/home";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Ingredient from "../../pages/ingredient";
import NotFound404 from "../../pages/not-found-404";
import { OnlyGuest, OnlyAuth } from "../protected-route-element/protected-rote-element";
import Login from "../../pages/login";
import {useDispatch} from "react-redux";
import {checkUserAuth} from "../../services/actions/autentication";


function App() {
  // Стейт для хранения состояния модального окна (открыто/закрыто)
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);


  // Обработка закрытия модального окна
  const handleCloseModal = () => {
    setIsOpenedModal(false);
  }


  const modal = (
    <Modal onClose={handleCloseModal}>
      <h2 className={`pt-20 pb-1 text text_type_main-large`}>Ошибка!</h2>
      <p className={`p-10 text text_type_main-default`}>
        При загрузке данных с сервера произошла ошибка. Попробуйте повторить попвтку позже.
      </p>
    </Modal>
  )


  return (
    <Router>
      <div className={styles.app}>
        <AppHeader/>
        <Routes>
          <Route
            path="/"
            element={<Home/>}/>

          <Route
            path="/ingredients/:ingredientId"
            element={<Ingredient/>}/>

          <Route
            path="/login"
            element={<OnlyGuest element={<Login/>}/>}/>

          <Route
            path="/register"
            element={<OnlyGuest element={<Register/>}/>}/>

          <Route
            path="/forgot-password"
            element={<OnlyGuest element={<ForgotPassword/>}/>}/>

          <Route
            path="/reset-password"
            element={<OnlyGuest element={<ResetPassword/>}/>}/>

          <Route
            path="/profile"
            element={<OnlyAuth element={<Profile/>}/>}/>

          <Route
            path="/profile/*"
            element={<OnlyAuth element={<Profile/>}/>}/>

          <Route path="*" element={<NotFound404/>}/>
        </Routes>
      </div>
      {isOpenedModal && modal}
    </Router>
  );
}


export default App;
