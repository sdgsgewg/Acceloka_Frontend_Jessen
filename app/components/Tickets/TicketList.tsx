import React from "react";
import Ticket from "./Ticket";
import ITicket from "@/app/interface/ITicket";

interface TicketListProps {
  tickets: ITicket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {tickets.map((ticket) => (
        <Ticket key={ticket.ticketCode} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
