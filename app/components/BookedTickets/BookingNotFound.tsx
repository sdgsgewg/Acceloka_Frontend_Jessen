import Image from "next/image";
import React from "react";

const BookingNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50dvh]">
      <Image
        src="/img/booking-not-found.png"
        alt="Booking Not Found"
        width={350}
        height={350}
      />
      <p className="text-2xl text-slate-400 font-semibold text-center">
        Booking Not Found
      </p>
    </div>
  );
};

export default BookingNotFound;
