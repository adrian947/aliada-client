import { createContext, useEffect, useReducer } from "react";
import { tokenAuth } from "../../service/authTokenHeaders";
import client from "../../service/clientAxios";
import { ticketReducer } from "./TicketReducer";
import { useAlert } from "./../../hooks/useAlert";
import {
  TICKET_ACTIVE,
  TICKETS,
  TICKET_DISABLED,
  TICKET_UPDATE,
} from "./types";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const { alert, showAlert } = useAlert();
  const initialState = {
    tickets: [],
    ticketActive: null,
    openModalTicket: false,
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    const getTickets = async () => {
      const { data } = await client.get("ticket", tokenAuth());

      dispatch({
        type: TICKETS,
        payload: data,
      });
    };

    getTickets();
  }, []);

  const ticketActive = (ticket) => {
    dispatch({
      type: TICKET_ACTIVE,
      payload: ticket,
    });
  };

  const ticketModalClose = () => {
    dispatch({
      type: TICKET_DISABLED,
    });
  };

  const updateTicket = async (ticket_id, ticket) => {
    try {
      await client.put(`ticket/${ticket_id}`, ticket, tokenAuth());

      dispatch({
        type: TICKET_UPDATE,
        payload: ticket,
      });
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <TicketContext.Provider
      value={{
        alert,
        state,
        ticketActive,
        ticketModalClose,
        updateTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
