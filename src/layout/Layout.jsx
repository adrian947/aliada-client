import React, { useContext } from "react";
import { Header } from "../Components/Header";
import { AuthContext } from "../context/Auth/AuthProvider";
import { DashboardTickets } from "../pages/DashboardTickets";
import { RegisterClaim } from "./../pages/RegisterClaim";
import { Navigate } from "react-router-dom";
import { TicketProvider } from "../context/Ticket/TicketProvider";

export const Layout = () => {
  const { state, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout'>
      {!state.auth && <Navigate to='/' />}
      <Header />

      {state.type === "operator_key" || state.type === "operator" ? (
        <TicketProvider>
          <DashboardTickets />
        </TicketProvider>
      ) : (
        <RegisterClaim />
      )}
    </div>
  );
};
