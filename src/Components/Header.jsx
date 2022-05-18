import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import logo from "/assets/logo.png";

export const Header = () => {
  const navigate = useNavigate();
  const { state, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    navigate("/");
    localStorage.clear();
    logOut();
  };

  return (
    <header className='header'>
      <img src={logo} alt='logo-aliada' />
      <div className='header__left'>
        <p className='header__p'>Hola! {state.user} </p>
        <button type='button' className='header__button' onClick={handleLogOut}>
          Cerrar Sesion
        </button>
      </div>
    </header>
  );
};
