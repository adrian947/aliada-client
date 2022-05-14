import React, { useContext } from "react";
import { Alert } from "../Components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { useForm } from "./../hooks/useForm";

export const Login = () => {
  const navigate = useNavigate();
  const {alert, state, loginUser } = useContext(AuthContext);

  const initialForm = {
    email: "a@a.com",
    password: "123123",
  };

  const [values, handleInputChange, reset] = useForm(initialForm);

  const handleSubmit = async(e) => {
    e.preventDefault();
    reset();
   const resp = await loginUser(values);

   if (resp) navigate("/layout");
  };

  return (
    <main className='auth layout'>
      <div className='auth__formContainer'>
      {alert.msg && <Alert alert={alert} />}
        <form className='auth__form' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            className='auth__input'
            name='email'
            onChange={handleInputChange}
            value={values.email}
          />
          <input
            type='password'
            placeholder='Contraseña'
            className='auth__input'
            name='password'
            onChange={handleInputChange}
            value={values.password}
          />
          <input
            type='submit'
            value='iniciar sesión'
            className='auth__button'
          />
        </form>
        <Link to='/register'>
          <p className='auth__p'>¿Aun no tienes cuenta?</p>
        </Link>
      </div>
    </main>
  );
};
