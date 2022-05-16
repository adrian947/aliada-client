import React, { useContext } from 'react'
import { TicketContext } from '../context/Ticket/TicketProvider';
import { useForm } from './../hooks/useForm';
import { AuthContext } from './../context/Auth/AuthProvider';

const FormModalTicket = ({ticketActive}) => {
    const { state, ticketModalClose, updateTicket } = useContext(TicketContext);
    const { state: stateAuth } = useContext(AuthContext);


    const initialForm = {
        status: ticketActive.status,
        observation: ticketActive.observation || "",
      };

    const [values, handleInputChange, reset] = useForm(initialForm);
  
    const { status, observation } = values;


    const handleSubmit = (e) => {    
        e.preventDefault();
        updateTicket(ticketActive.id, {
          status,
          observation,
          operator_id: stateAuth.id,
        });
        reset();
      };
    


  return (
    <form className='ticket__form' onSubmit={handleSubmit}>
    <select
      className='ticket__select'
      value={status}
      name='status'
      onChange={handleInputChange}
    >
      <option values='abierto'>Abierto</option>
      <option values='en progreso'>En progreso</option>
      <option values='resuelto'>Resuelto</option>
      <option values='necesita reembolso'>
        Necesita reembolso
      </option>
    </select>
    <textarea
      className='ticket__textArea'
      onChange={handleInputChange}
      name='observation'
      value={observation}
      placeholder='Coloque aquí una observacion'
    ></textarea>
    <button className='ticket__button'>Actualizar Reclamo</button>
  </form>
  )
}

export default FormModalTicket