import {
  TICKET_ACTIVE,
  TICKETS,
  TICKET_DISABLED,
  TICKET_UPDATE,
  TICKET_DELETE,
} from "./types";

export const ticketReducer = (state, action) => {
  switch (action.type) {
    case TICKETS:
      return {
        ...state,
        tickets: action.payload.resp,
        totalTickets: action.payload.total,
      };
    case TICKET_ACTIVE:
      return {
        ...state,
        ticketActive: action.payload,
        openModalTicket: true,
      };
    case TICKET_DISABLED:
      return {
        ...state,
        ticketActive: null,
        openModalTicket: false,
      };
    case TICKET_UPDATE:
      return {
        ...state,
        ticketActive: null,
        openModalTicket: false,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    case TICKET_DELETE:
      return {
        ...state,
        ticketActive: null,
        openModalTicket: false,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
      };

    default:
      return state;
  }
};
