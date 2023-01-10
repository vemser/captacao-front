import { DrawerContainer } from "components/DrawerContainer";
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetLoggedUserQuery } from "shared/features/api/usuario/authSlice";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  const { data: getLoggedUser } = useGetLoggedUserQuery();

  const [ roles, setRoles ] = useState(false)

  
    if (getLoggedUser) {
      if ((getLoggedUser?.cargos.filter(e => e.nome === 'ROLE_ADMIN').length > 0) || (getLoggedUser?.cargos.filter(e => e.nome === 'ROLE_GESTAO_DE_PESSOA').length > 0) || (getLoggedUser?.cargos.filter(e => e.nome === 'ROLE_INSTRUTOR').length > 0)) {
        setRoles(true)

      } else {
        setRoles(false)

      }
    }

  return token && roles == true ?(
    <DrawerContainer>
      <>
      {toast.error('titeeeeeeeeeee')}
      <Outlet />
      </>
    </DrawerContainer>
  ) : (
    <>
    {toast.error('DYBALAAAAAAA')}
    <Navigate to="/" />
    </>
  );
};
