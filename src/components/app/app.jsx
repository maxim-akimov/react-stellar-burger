import React, {useEffect} from "react";
import {Routes, Route, useLocation, useNavigate,} from 'react-router-dom';

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import Home from "../../pages/home";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import NotFound404 from "../../pages/not-found-404";
import {OnlyGuest, OnlyAuth} from "../protected-route-element/protected-rote-element";
import Login from "../../pages/login";
import {useDispatch, useSelector} from "react-redux";
import {checkUserAuth} from "../../services/actions/autentication";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getBurgerIngredients} from "../../services/actions/burger-ingredients";
import Orders from "../../pages/orders";
import User from "../../pages/user";



function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;
  const burgerIngredients = useSelector((store) => store.burgerIngredients.items)

  useEffect(() => {
    dispatch(
      getBurgerIngredients()
    );

    dispatch(checkUserAuth());
  }, []);



  // Обработка закрытия модального окна
  const handleCloseModal = () => {
    navigate(-1);
  }


  return (
    (burgerIngredients && burgerIngredients.length > 0 &&
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

        <Route
          path="/profile"
          element={<OnlyAuth element={<User/>}/>}>
          <Route
            index
            element={<OnlyAuth element={<Profile/>}/>}/>
          <Route
            path="orders"
            element={<OnlyAuth element={<Orders/>}/>}/>
        </Route>

        <Route
          path='/ingredients/:ingredientId'
          element={<IngredientDetails />}/>

        <Route path="*" element={<NotFound404/>}/>
      </Routes>


      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onClose={handleCloseModal}>
                {<IngredientDetails />}
              </Modal>
            }
          />
        </Routes>
      )}
    </div>)
  );
}


export default App;