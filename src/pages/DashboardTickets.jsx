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
import { format } from './../helpers/formatDate';

const ticketStyle = (ticketStatus) => {
  switch (ticketStatus) {
    case "Abierto":
      return { backgroundColor: "#519259" };
    case "En progreso":
      return { backgroundColor: "#FFD365" };
    case "Resuelto":
      return { backgroundColor: "#D9534F" };
    case "Necesita reembolso":
      return { backgroundColor: "#19282F", color: "#ffffff" };

    default:
      break;
  }
};

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
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
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
                <TableCell>{ticket.description}</TableCell>
                <TableCell style={ticketStyle(ticket.status)}>
                  {ticket.status}
                </TableCell>
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
