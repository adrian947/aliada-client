import { TICKETS } from "./types";

export const ticketReducer = (state, action) => {
  switch (action.type) {
    case TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };

    default:
      return state;
  }
};
