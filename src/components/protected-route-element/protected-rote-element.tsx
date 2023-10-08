import { FC, ReactElement } from "react";

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "../../services/hooks/useSelector";

import { Preloader } from "../preloader/preloader";


const ProtectedRouteElement: FC<{ onlyGuest?: boolean, element: ReactElement }> = ({ onlyGuest = false, element }) => {
  const location = useLocation();

  // Получение из хранилища значение флага, фиксирующего факт проведения процесса авторизации
  // без учета результата проверки
  const isAuthChecked = useSelector((store) => store.authentication.isAuthChecked);

  // Получение из хранилища данных пользователя
  const user = useSelector((store) => store.user.user);


  // Если проверка авторизации еще не производитась
  if (!isAuthChecked) {
    return <Preloader/>;
  }


  // Авторизованный пользователь пытается попасть в раздел,
  // предназначенный только для неавторизованных пользователей
  if (onlyGuest && user) {
    // Перенаправляем пользователя на предыдущий адрес, записанный в истории или на гравную страницу
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from}/>
  }


  // Пользователь не авторизован, маршрут предназначен только для авторизованных
  if (!onlyGuest && !user) {
    // Перенаправление на страницу авторизации
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  // Остальные случаи подразумевают, что пользователь авторизован и маршрут
  // предназначен для авторизованных пользователей
  return element;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyGuest: FC<{element: ReactElement}> = ({ element }) => (
  <ProtectedRouteElement onlyGuest={true} element={element}/>
);