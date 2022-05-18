import React, { useContext } from "react";
import { TicketContext } from "../context/Ticket/TicketProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const PaginationTable = () => {
  const { state, page, setPage } = useContext(TicketContext);

  const handleChange = (event, value) => {
    setPage(value);
  };  

  return (
    <Stack spacing={2} className='pagination'>
      <Pagination
        count={Math.ceil(state.totalTickets / 3)}
        page={page}
        onChange={handleChange}        
      />
    </Stack>
  );
};
