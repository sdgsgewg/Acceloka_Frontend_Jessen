import IBookedTicket from "@/app/interface/IBookedTicket";
import React from "react";
import BookedTicket from "./BookedTicket";

interface BookedTicketListProps {
  bookedTickets: IBookedTicket[];
}

const BookedTicketList: React.FC<BookedTicketListProps> = ({
  bookedTickets = [],
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {bookedTickets.map((bookedTicket) => (
        <BookedTicket
          key={bookedTicket.bookedTicketId}
          bookedTicket={bookedTicket}
        />
      ))}
    </div>
  );
};

export default BookedTicketList;
