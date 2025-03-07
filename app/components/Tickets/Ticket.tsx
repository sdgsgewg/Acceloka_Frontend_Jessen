import Link from "next/link";
import React, { useEffect, useState } from "react";
import ITicket from "@/app/interface/ITicket";
import Image from "next/image";
import getTicketImage from "@/app/utils/getTicketImage";

interface TicketProps {
  ticket: ITicket;
}

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  const [ticketImage, setTicketImage] = useState("/img/default.jpg");

  useEffect(() => {
    const categoryName = ticket.categoryName;
    const ticketName = ticket.ticketName.split(" ");
    console.log("TIcket:", ticket);
    console.log("Category Name:", categoryName);
    console.log("Ticket Name:", ticketName[0]);
    setTicketImage(getTicketImage(categoryName, ticketName[0]));
  }, [ticket]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Link href={`/tickets/${ticket.ticketCode}`}>
      <div
        className="max-w-lg flex flex-col items-center rounded-lg shadow-md bg-white text-center overflow-hidden hover:bg-gray-200 hover:scale-105 transition duration-300 ease-in-out"
        key={ticket.ticketCode}
      >
        <div className="w-full h-[250px] overflow-hidden">
          <Image
            src={ticketImage}
            alt={ticket.categoryName}
            width={400}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="py-3">
          <h2 className="text-md text-gray-800 font-semibold">
            {ticket.ticketName}
          </h2>
          <p className="text-gray-600 text-sm">
            {" "}
            Event Date:{" "}
            {new Date(ticket.eventDate).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex justify-between text-blue-400 text-sm mt-4">
            <p>{"Rp" + formatPrice(ticket.price)}</p>
            <p>{"Quota: " + ticket.quota}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Ticket;
