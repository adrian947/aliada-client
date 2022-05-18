import React, { useContext, useEffect, useState } from "react";
import client from "../service/clientAxios";
import { tokenAuth } from "./../service/authTokenHeaders";
import { AuthContext } from "./../context/Auth/AuthProvider";
import { TicketContext } from "../context/Ticket/TicketProvider";
import { useForm } from "./../hooks/useForm";
import { Alert } from "./Alert";

const FormModalTicket = ({ ticketActive }) => {
  const [operators, setOperators] = useState([]);
  const { updateTicket, deleteTicket, alert } = useContext(TicketContext);
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
    operator: ticketActive.operator_id || "",
  };

  const [values, handleInputChange, reset] = useForm(initialForm);

  const { status, observation, operator } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectOperator = document.getElementById("operator");
    const OptionOperator =
      selectOperator?.options[selectOperator.selectedIndex].text;

    updateTicket(ticketActive.id, {
      ...ticketActive,
      operator_id: operator ? parseInt(operator) : stateAuth.id,
      name: OptionOperator ? OptionOperator : stateAuth.user,
      status,
      observation,
    });
    reset();
  };

  const handleDeleteTicket = () => {
    deleteTicket(ticketActive.id);
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

        <select
          className='ticket__select'
          name='status'
          onChange={handleInputChange}
          defaultValue={"DEFAULT"}
        >
          <option value={"DEFAULT"} disabled>
            Cambiar Status
          </option>
          <option value='Abierto'>Abierto</option>
          <option value='En progreso'>En progreso</option>
          <option value='Resuelto'>Resuelto</option>
          <option value='Necesita reembolso'>Necesita reembolso</option>
        </select>

        <textarea
          className='ticket__textArea'
          onChange={handleInputChange}
          name='observation'
          value={observation}
          placeholder='Coloque aquí una observacion'
        ></textarea>
        <button className='ticket__button' type='submit'>
          Actualizar Reclamo
        </button>
        {stateAuth.type === "operator_key" && (
          <button
            className='ticket__button--delete'
            type='button'
            onClick={handleDeleteTicket}
          >
            Eliminar Reclamo
          </button>
        )}
      </form>
      {alert.msg && <Alert alert={alert} />}
    </>
  );
};

export default FormModalTicket;
