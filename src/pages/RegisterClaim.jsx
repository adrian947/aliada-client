import React, { useContext, useState } from "react";
import client from "../service/clientAxios";
import { tokenAuth } from "./../service/authTokenHeaders";
import { AuthContext } from "./../context/Auth/AuthProvider";
import { useAlert } from "../hooks/useAlert";
import { useForm } from "../hooks/useForm";
import { Alert } from "./../Components/Alert";

export const RegisterClaim = () => {
  const [idTicket, setIdTicket] = useState("");
  const { state } = useContext(AuthContext);
  const { alert, showAlert } = useAlert();

  const initialForm = {
    name_user: state.user,
    surname_user: "",
    description: "",
  };

  const [values, handleInputChange, reset] = useForm(initialForm);

  const { name_user, surname_user, description } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdTicket("");
    
    if (!name_user || !surname_user || !description) {
      showAlert({
        msg: "Todos los campos deben estar completos",
        error: true,
      });
      return;
    }

    reset();

    try {
      const { data } = await client.post("ticket", values, tokenAuth());

      setIdTicket(
        `Tu numero de reclamo es #${data.id} pronto tendras una respuesta de nuestros operadores`
      );
    } catch (error) {
      showAlert({
        msg: error,
        error: true,
      });
    }
  };

  return (
    <main className='auth'>
      <div className='auth__formContainer'>
        {alert.msg && <Alert alert={alert} />}
        {idTicket && <p className='info alert'>{idTicket}</p>}
        <form className='auth__form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nombre'
            className='auth__input'
            name='name_user'
            onChange={handleInputChange}
            value={name_user}
          />
          <input
            type='text'
            placeholder='Surname'
            className='auth__input'
            name='surname_user'
            onChange={handleInputChange}
            value={surname_user}
          />
          <textarea
            type='text'
            placeholder='Escriba aqui su reclamo'
            className='auth__input'
            name='description'
            onChange={handleInputChange}
            value={description}
          ></textarea>
          <input
            type='submit'
            value='Enviar Reclamo'
            className='auth__button'
          />
        </form>
      </div>
    </main>
  );
};
