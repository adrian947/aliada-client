import React, { useContext } from 'react'
import { TicketContext } from '../context/Ticket/TicketProvider'

export const DashboardTickets = () => {

  const {state} = useContext(TicketContext)


  if (!state) return null
  return (
    <main>
      {
        state.tickets.map(ticket=>(
          ticket.id
        ))
      }
    
    </main>
  )
}
