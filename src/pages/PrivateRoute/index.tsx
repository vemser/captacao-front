import { DrawerContainer } from "components/DrawerContainer";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const token = "cvxzcv";
  return token ? (
    <DrawerContainer>
      <Outlet />
    </DrawerContainer>
  ) : (
    <Navigate to="/" />
  );
};
