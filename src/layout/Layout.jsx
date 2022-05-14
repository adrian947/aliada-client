import React, { useContext, useEffect } from "react";
import { Header } from "../Components/Header";
import { AuthContext } from "../context/Auth/AuthProvider";
import { DashboardTickets } from "../pages/DashboardTickets";
import { RegisterClaim } from "./../pages/RegisterClaim";
import { Navigate } from "react-router-dom";

export const Layout = () => {
  const { state, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout'>
      {!state.auth && <Navigate to='/' />}
      <Header />

      {state.type === "operator_key" || state.type === "operator" ? (
        <DashboardTickets />
      ) : (
        <RegisterClaim />
      )}
    </div>
  );
};
