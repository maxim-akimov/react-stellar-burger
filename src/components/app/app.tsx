// Библиотеки
import React, { FC, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/hooks/useDispatch'
import { useSelector } from '../../services/hooks/useSelector'

// Компоненты
import AppHeader from "../app-header/app-header";
import { Modal } from "../modal/modal";
import { Home } from "../../pages/home/home";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { NotFound404 } from "../../pages/not-found-404/not-found-404";
import { OnlyGuest, OnlyAuth } from "../protected-route-element/protected-rote-element";
import { Login } from "../../pages/login/login";
import { checkUserAuthThunk } from "../../services/thunks/authentication";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Orders } from "../../pages/orders/orders";
import { User } from "../../pages/profile/user";
import { Feed } from "../../pages/feed/feed";
import { OrderDetails } from "../order-details/order-details";

// Стили
import styles from "./app.module.css";
import { getIngredientsThunk } from "../../services/thunks/ingredients";
import { Preloader } from "../preloader/preloader";


export const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const ingredients = useSelector((store) => store.ingredients.data)


  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(checkUserAuthThunk());
  }, []);


  // Обработка закрытия модального окна
  const handleCloseModal = () => {
    navigate(-1);
  }


  if (!ingredients || ingredients.length === 0) return <Preloader />


  return (
      <div className={styles.app}>
        <AppHeader/>
        <Routes location={background || location}>
          <Route
            index
            path="/"
            element={<Home/>}/>

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

          <Route path="/profile" element={<OnlyAuth element={<User/>}/>}>
            <Route index element={<OnlyAuth element={<Profile/>}/>}/>
            <Route path="orders" element={<OnlyAuth element={<Orders/>}/>}/>
          </Route>

          <Route
            path="/profile/orders/:orderNumber"
            element={<OnlyAuth element={<OrderDetails/>}/>}/>

          <Route
            path="/feed"
            element={<Feed/>}>
          </Route>

          <Route
            path="/feed/:orderNumber"
            element={<OrderDetails/>}/>

          <Route
            path='/ingredients/:ingredientId'
            element={<IngredientDetails/>}/>

          <Route path="*" element={<NotFound404/>}/>
        </Routes>


        {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal onClose={handleCloseModal}>
                  {<IngredientDetails/>}
                </Modal>
              }
            />

            <Route
              path='/profile/orders/:orderNumber'
              element={
                <Modal onClose={handleCloseModal}>
                  {<OrderDetails/>}
                </Modal>
              }
            />

            <Route
              path='/feed/:orderNumber'
              element={
                <Modal onClose={handleCloseModal}>
                  {<OrderDetails/>}
                </Modal>
              }
            />
          </Routes>
        )}
        )
      </div>
  );
}


