import {Navigate, Route, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";



function ProtectedRouteElement({ onlyGuest = false,  element }) {
  // Получение из хранилища значение флага, фиксирующего факт проведения процесса авторизации
  // без учета результата проверки
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);

  // Получение из хранилища данных пользователя
  const user = useSelector((store) => store.user.user);


  const location = useLocation();


  // Если проверка авторизации еще не производитась
  if (!isAuthChecked) {
    //TODO
    // Запуск прелоадера
    return null;
  }


  // Авторизованный пользователь пытается попасть в раздел,
  // предназначенный только для неавторизованных пользователей
  if (onlyGuest && user) {
    // Перенаправляем пользователя на предыдущий адрес, записанный в истории или на гравную страницу
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />
  }


  // Пользователь не авторизован, маршрут предназначен только для авторизованных
  if (!onlyGuest && !user) {
    // Перенаправление на страницу авторизации
    //todo проверить state={{ from: location }}
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Остальные случаи подразумевают, что пользователь авторизован и маршрут
  // предназначен для авторизованных пользователей
  return element;
}


export const OnlyAuth = ProtectedRouteElement;

export const OnlyGuest =({ element }) => (
  <ProtectedRouteElement onlyGuest={true} element={element} />
);