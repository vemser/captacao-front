import { DrawerContainer } from "components/DrawerContainer";
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetLoggedUserQuery } from "shared/features/api/usuario/authSlice";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ?(
    <DrawerContainer>
      <>
      <Outlet />
      </>
    </DrawerContainer>
  ) : (
    <>
    <Navigate to="/" />
    </>
  );
};
