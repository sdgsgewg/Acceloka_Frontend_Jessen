"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Home,
  Ticket,
  ShoppingCart,
  CalendarCheck,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 bg-blue-900 shadow-md z-50">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/img/logo.png" alt="logo" width={60} height={60} />
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 text-white text-md">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <Home size={18} />
            Home
          </Link>
          <Link
            href="/tickets"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <Ticket size={18} />
            Tickets
          </Link>
          <Link
            href="/carts"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>
          <Link
            href="/booked-tickets"
            className="flex items-center gap-2 hover:text-gray-300 transition"
          >
            <CalendarCheck size={18} />
            Bookings
          </Link>
        </div>

        {/* Burger Menu Button (MD ke bawah) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-blue-800 text-white rounded-md shadow-md p-4 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            <Home size={18} />
            Home
          </Link>
          <Link
            href="/tickets"
            className="flex items-center gap-2 hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            <Ticket size={18} />
            Tickets
          </Link>
          <Link
            href="/carts"
            className="flex items-center gap-2 hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={18} />
            Cart
          </Link>
          <Link
            href="/booked-tickets"
            className="flex items-center gap-2 hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            <CalendarCheck size={18} />
            Bookings
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
