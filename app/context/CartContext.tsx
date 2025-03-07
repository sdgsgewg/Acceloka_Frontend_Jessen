"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import ICartTicket from "../interface/IModifiedTicket";
import IBookedTickets from "../interface/IModifiedTicket";

interface CartContextType {
  cart: ICartTicket[]; // untuk menyimpan semua tiket yang ditambah ke keranjang
  addToCart: (ticket: ICartTicket) => void;
  removeFromCart: (ticketCode: string) => void;
  addQty: (ticket: ICartTicket) => void;
  minusQty: (ticket: ICartTicket) => void;
  clearCart: () => void;
  bookedTickets: IBookedTickets[]; // untuk menyimpan daftar tiket yang di-check dari dafatr tiket di cart saja
  addToBookedTickets: (ticket: IBookedTickets) => void;
  removeFromBookedTickets: (ticketCode: string) => void;
  clearBookedTickets: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICartTicket[]>([]);
  const [bookedTickets, setBookedTickets] = useState<IBookedTickets[]>([]);

  const addToCart = (ticket: ICartTicket) => {
    setCart((prevCart) => {
      const existingTicket = prevCart.find(
        (t) => t.ticketCode === ticket.ticketCode
      );
      if (existingTicket) {
        // jika tiket sudah pernah ditambahkan ke cart sebelumnya, maka tambah quantitynya
        return prevCart.map((t) =>
          t.ticketCode === ticket.ticketCode
            ? { ...t, quantity: t.quantity + ticket.quantity }
            : t
        );
      } else {
        // jika belum pernah, tambahkan tiket ke cart langsung
        return [...prevCart, ticket];
      }
    });
  };

  const addQty = (ticket: ICartTicket) => {
    setCart((prevCart) => {
      return prevCart.map((t) =>
        t.ticketCode === ticket.ticketCode
          ? { ...t, quantity: t.quantity + 1 }
          : t
      );
    });

    setBookedTickets((prev) => {
      return prev.map((t) =>
        t.ticketCode === ticket.ticketCode
          ? { ...t, quantity: t.quantity + 1 }
          : t
      );
    });
  };

  const minusQty = (ticket: ICartTicket) => {
    setCart((prevCart) => {
      return prevCart.map((t) =>
        t.ticketCode === ticket.ticketCode
          ? { ...t, quantity: t.quantity - 1 }
          : t
      );
    });

    setBookedTickets((prev) => {
      return prev.map((t) =>
        t.ticketCode === ticket.ticketCode
          ? { ...t, quantity: t.quantity - 1 }
          : t
      );
    });
  };

  const removeFromCart = (ticketCode: string) => {
    setCart((prevCart) =>
      prevCart.filter((ticket) => ticket.ticketCode !== ticketCode)
    );
  };

  const clearCart = () => setCart([]);

  const addToBookedTickets = (ticket: IBookedTickets) => {
    setBookedTickets((prev) => {
      const existingTicket = prev.find(
        (t) => t.ticketCode === ticket.ticketCode
      );
      if (existingTicket) {
        return prev.map((t) =>
          t.ticketCode === ticket.ticketCode
            ? { ...t, quantity: t.quantity + ticket.quantity }
            : t
        );
      } else {
        return [...prev, ticket];
      }
    });
  };

  const removeFromBookedTickets = (ticketCode: string) => {
    setBookedTickets((prev) =>
      prev.filter((ticket) => ticket.ticketCode !== ticketCode)
    );
  };

  const clearBookedTickets = () => setBookedTickets([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addQty,
        minusQty,
        removeFromCart,
        clearCart,
        bookedTickets,
        addToBookedTickets,
        removeFromBookedTickets,
        clearBookedTickets,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
