import React, { useContext } from "react";
import { TicketContext } from "../context/Ticket/TicketProvider";
import { format } from "./../helpers/formatDate";
import { ticketStyle } from "./../helpers/ticketStyle";
import { ModalTicket } from "../Components/ModalTicket";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { PaginationTable } from "../Components/PaginationTable";
import { FilterSelect } from "../Components/FilterSelect";

export const DashboardTickets = () => {
  const { state, ticketActive } = useContext(TicketContext);

  if (!state) return null;

  const viewTicket = (ticket) => {
    ticketActive(ticket);
  };

  return (
    <div className='table'>
      <FilterSelect />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Reclamo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Observation</TableCell>
              <TableCell>Operador</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                hover={true}
                style={{ cursor: "pointer" }}
                onClick={() => viewTicket(ticket)}
              >
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{format(ticket.date)}</TableCell>
                <TableCell>{ticket.name_user}</TableCell>
                <TableCell>{ticket.surname_user}</TableCell>
                <TableCell>
                  <blockquote className='ticket-ellipsis'>
                    {ticket.email_user}{" "}
                  </blockquote>
                </TableCell>
                <TableCell>
                  <blockquote className='ticket-ellipsis'>
                    {ticket.description}
                  </blockquote>
                </TableCell>
                <TableCell style={ticketStyle(ticket.status)}>
                  {ticket.status}
                </TableCell>
                <TableCell>
                  <blockquote className='ticket-ellipsis'>
                    {ticket.observation}
                  </blockquote>
                </TableCell>
                <TableCell>{ticket.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable />
      <ModalTicket />
    </div>
  );
};
