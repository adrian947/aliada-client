import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/Auth/AuthProvider";
import { Alert } from "./../Components/Alert";

export const Register = () => {  
  const navigate = useNavigate();  
  const { alert, registerUser, showAlert } = useContext(AuthContext);

  const initialForm = {
    name: "adrian",
    email: "z@z.com",
    password: "123123",
    rpassword: "123123",
  };

  const [values, handleInputChange, reset] = useForm(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.rpassword !== values.password){
      return showAlert({
        msg: 'Hay un error al repetir su contraseña',
        error: true,
      });
    }
    
    const { rpassword, ...user } = values;
    
    reset();

    const resp = await registerUser(user);

    if (resp) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className='layout'>
      <main className='auth'>
        <div className='auth__formContainer'>
          {alert.msg && <Alert alert={alert} />}
          <form className='auth__form' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Nombre'
              className='auth__input'
              name='name'
              onChange={handleInputChange}
              value={values.name}
            />
            <input
              type='text'
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
              type='password'
              placeholder='Repetir Contraseña'
              className='auth__input'
              name='rpassword'
              onChange={handleInputChange}
              value={values.rpassword}
            />
            <input type='submit' value='Registrarse' className='auth__button' />
          </form>
          <Link to='/'>
            <p className='auth__p'>Ya tengo cuenta!</p>
          </Link>
        </div>
      </main>
    </div>
  );
};
