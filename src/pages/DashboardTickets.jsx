import React, { useContext } from "react";
import { TicketContext } from "../context/Ticket/TicketProvider";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { ModalTicket } from "../Components/ModalTicket";

export const DashboardTickets = () => {
  const { state, ticketActive } = useContext(TicketContext);

  if (!state) return null;

  const viewTicket = (ticket) => {
    ticketActive(ticket);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Apellido</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Reclamo</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Observation</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Operador</TableCell>
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
                <TableCell>{ticket.date}</TableCell>
                <TableCell>{ticket.name_user}</TableCell>
                <TableCell>{ticket.surname_user}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.observation}</TableCell>
                <TableCell>{ticket.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalTicket />
    </>
  );
};
