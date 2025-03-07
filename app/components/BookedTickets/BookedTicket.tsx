import IBookedTicket from "@/app/interface/IBookedTicket";
import Link from "next/link";
import React from "react";

interface BookedTicketProps {
  bookedTicket: IBookedTicket;
}

const BookedTicket: React.FC<BookedTicketProps> = ({ bookedTicket }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Link href={`/booked-tickets/${bookedTicket.bookedTicketId}`}>
      <div
        className="border border-gray-300 rounded-lg p-4 shadow-md bg-white text-center hover:bg-gray-200 hover:scale-105 transition duration-300 ease-in-out"
        key={bookedTicket.bookedTicketId}
      >
        <h2 className="text-gray-400 text-lg font-semibold">
          {"Booking " + bookedTicket.bookedTicketId}
        </h2>

        <p className="text-gray-700 text-sm">
          {"Booking Date: " +
            new Date(bookedTicket.bookingDate).toLocaleDateString("en-EN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
        </p>
        <p className="text-gray-500 text-sm">
          {"Total Price: Rp " + formatPrice(bookedTicket.totalPrice)}
        </p>
      </div>
    </Link>
  );
};

export default BookedTicket;
