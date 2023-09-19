import { Route } from 'react-router-dom';



function ProtectedRouteElement({ element }) {

  return element;
}


export const OnlyAuth = ProtectedRouteElement;

export const OnlyGuest =({ element }) => (
  <ProtectedRouteElement onlyGuest={true} element={element} />
);
