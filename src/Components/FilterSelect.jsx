import React, { useContext } from "react";
import { TicketContext } from "./../context/Ticket/TicketProvider";

export const FilterSelect = () => {
  const { setStatusFilter, setPage } = useContext(TicketContext);

  const handleInputChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <select
      className='ticket__select'
      defaultValue={"Todos"}
      onChange={(e) => handleInputChange(e)}
    >
      <option value='Todos'>Todos</option>
      <option value='Abierto'>Abierto</option>
      <option value='En progreso'>En progreso</option>
      <option value='Resuelto'>Resuelto</option>
      <option value='Necesita reembolso'>Necesita reembolso</option>
    </select>
  );
};
