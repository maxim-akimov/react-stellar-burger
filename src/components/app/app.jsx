import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import ProtectedRouteElement from "../protected-route-element/protected-rote-element";


function App() {
  // Стейт для хранения состояния модального окна (открыто/закрыто)
  const [isOpenedModal, setIsOpenedModal] = useState(false);


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
        <main className={styles.main}>
            <Routes>
              <Route
                path="/"
                element={<Home />}/>

              <Route
                path="/ingredients/:ingredientId"
                element={<Ingredient />}/>

              <Route
                path="/register"
                element={<Register />} />

              <Route
                path="/forgot-password"
                element={<ProtectedRouteElement element={<ForgotPassword />}/>} />

              <Route
                path="/reset-password"
                element={<ProtectedRouteElement element={<ResetPassword />}/>} />

              <Route
                path="/profile"
                element={<ProtectedRouteElement element={<Profile />}/>} />

              <Route
                path="/profile/*"
                element={<ProtectedRouteElement element={<Profile />}/>} />

              <Route path="*" element={<NotFound404/>}/>
            </Routes>
        </main>
      </div>
      {isOpenedModal && modal}
    </Router>
  );
}


export default App;
