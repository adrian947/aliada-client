import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { TicketProvider } from "../context/Ticket/TicketProvider";
import { DashboardTickets } from "../pages/DashboardTickets";
import { RegisterClaim } from "./../pages/RegisterClaim";
import { Header } from "../Components/Header";

export const Layout = () => {
  const { state, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout-container'>
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
    </div>
  );
};
