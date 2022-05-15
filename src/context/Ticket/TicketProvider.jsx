import { createContext, useEffect, useReducer } from "react";
import { tokenAuth } from "../../service/authTokenHeaders";
import client from "../../service/clientAxios";
import { ticketReducer } from "./TicketReducer";
import { TICKETS } from "./types";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const initialState = {
    tickets: [],
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    const getTickets = async () => {
      const { data } = await client.get("ticket", tokenAuth());

      dispatch({
        type: TICKETS,
        payload: data,
      });

      console.log("resp", data);
    };

    getTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ state }}>
      {children}
    </TicketContext.Provider>
  );
};
