import React, { useContext } from "react";
import { TicketContext } from "../context/Ticket/TicketProvider";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FormModalTicket from "./FormModalTicket";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalTicket = () => {
  const { state, ticketModalClose } = useContext(TicketContext);  
  const { ticketActive, openModalTicket } = state;

  const handleClose = () => {
    ticketModalClose();
  };

  if (!state.ticketActive) return;
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModalTicket}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalTicket}>
          <Box sx={style}>
            <div className='ticket'>
              <div className='ticket__info'>
                <h3 className='ticket__title'>
                  Id del reclamo # {ticketActive.id}
                </h3>
                <p className='ticket__p'>
                  <span>Nombre:</span> {ticketActive.name_user}
                </p>
                <p className='ticket__p'>
                  <span>Apellido:</span> {ticketActive.surname_user}
                </p>
                <p className='ticket__p'>
                  <span>Email:</span> {ticketActive.email_user}
                </p>
                <p className='ticket__p'>
                  <span>Descripción:</span> {ticketActive.description}
                </p>
                <p className='ticket__p'>
                  <span>Operador:</span>{" "}
                  {!ticketActive.name
                    ? "No hay operador asignado"
                    : ticketActive.name}
                </p>
              </div>
              <FormModalTicket ticketActive={ticketActive} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
