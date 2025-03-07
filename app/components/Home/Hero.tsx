import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex">
      <div className="w-[60%]">
        <Image
          src="/img/home.png"
          alt="Booking Online"
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[40%] flex flex-col justify-center">
        <h1 className="text-6xl text-blue-500 font-extrabold mb-4">
          Online Ticket Booking
        </h1>
        <p className="text-xl font-semibold text-blue-800 mb-2">
          All Tickets in One Place
        </p>
        <p className=" text-blue-900 mb-4">
          View and manage your travel tickets or reservations with ease. Ensure
          every booking goes smoothly!
        </p>
        <Link href="/tickets">
          <button className="bg-blue-500 rounded-md shadow-sm text-white px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
