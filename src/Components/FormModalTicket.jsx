import React, { useContext, useEffect, useState } from "react";
import { TicketContext } from "../context/Ticket/TicketProvider";
import { useForm } from "./../hooks/useForm";
import { AuthContext } from "./../context/Auth/AuthProvider";
import client from "../service/clientAxios";
import { tokenAuth } from "./../service/authTokenHeaders";

const FormModalTicket = ({ ticketActive }) => {
  const [operators, setOperators] = useState([]);
  const { updateTicket } = useContext(TicketContext);
  const { state: stateAuth } = useContext(AuthContext);

  useEffect(() => {
    const getOperators = async () => {
      const { data } = await client.get("operator/operators", tokenAuth());
      setOperators(data);
    };
    getOperators();
  }, []);

  const initialForm = {
    status: ticketActive.status,
    observation: ticketActive.observation || "",
    operator: "",
  };

  const [values, handleInputChange, reset] = useForm(initialForm);

  const { status, observation, operator } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTicket(ticketActive.id, {
      ...ticketActive,
      operator_id: ticketActive.operator_id,
      status,
      observation,
    });
    reset();
  };

  const handleTakeClaim = () => {
    const selectOperator = document.getElementById("operator");
    const OptionOperator =
      selectOperator?.options[selectOperator.selectedIndex].text;

    updateTicket(ticketActive.id, {
      ...ticketActive,
      operator_id: operator ? parseInt(operator) : stateAuth.id,
      name: OptionOperator ? OptionOperator : stateAuth.user,
    });
  };

  return (
    <>
      <form className='ticket__form' onSubmit={handleSubmit}>
        {stateAuth.type === "operator_key" && (
          <select
            className='ticket__select'
            value={operator}
            name='operator'
            onChange={handleInputChange}
            id='operator'
          >
            {operators.length !== 0 &&
              operators.map((operator) => (
                <option key={operator.id} id='op' value={operator.id}>
                  {operator.name}
                </option>
              ))}
          </select>
        )}

        <button
          className='ticket__button--reclamo'
          type='button'
          onClick={handleTakeClaim}
        >
          {stateAuth.type === "operator_key"
            ? "Asignar Reclamo"
            : "Tomar Reclamo"}
        </button>
        <select
          className='ticket__select'
          value={status}
          name='status'
          onChange={handleInputChange}
        >
          <option value='abierto'>Abierto</option>
          <option value='en progreso'>En progreso</option>
          <option value='resuelto'>Resuelto</option>
          <option value='necesita reembolso'>Necesita reembolso</option>
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
    </>
  );
};

export default FormModalTicket;
