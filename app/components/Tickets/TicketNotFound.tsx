import Image from "next/image";
import React from "react";

const TicketNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50dvh]">
      <Image
        src="/img/ticket-not-found.png"
        alt="Ticket Not Found"
        width={280}
        height={280}
      />
      <p className="text-2xl text-slate-400 font-semibold text-center">
        Ticket Not Found
      </p>
    </div>
  );
};

export default TicketNotFound;
