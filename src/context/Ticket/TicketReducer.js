import { TICKET_ACTIVE, TICKETS, TICKET_DISABLED, TICKET_UPDATE } from "./types";

export const ticketReducer = (state, action) => {
  switch (action.type) {
    case TICKETS:
      return {
        ...state,
        tickets: action.payload,
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
      console.log('ac', action.payload)
      return {
        ...state,
        ticketActive: null,
        openModalTicket: false,
        tickets: state.tickets.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      ),
      };

    default:
      return state;
  }
};
