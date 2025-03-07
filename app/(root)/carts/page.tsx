"use client";
import CartEmpty from "@/app/components/Carts/CartEmpty";
import CartItem from "@/app/components/Carts/CartItem";
import MessageModal from "@/app/components/modals/MessageModal";
import { useCart } from "@/app/context/CartContext";
import GlobalError from "@/app/global-error";
import Loading from "@/app/loading";
import api from "@/lib/apiClient";
import React, { useState } from "react";

const Carts = () => {
  const { cart, removeFromCart, clearCart, bookedTickets, clearBookedTickets } =
    useCart();

  // state for message modal
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleOpenMessageModal = () => setIsMessageModalOpen(true);
  const handleCloseMessageModal = () => setIsMessageModalOpen(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleBookTicket = async () => {
    try {
      setLoading(true);

      const response = await api.post("/book-ticket", {
        tickets: bookedTickets,
      });
      console.log(response.data);

      if (cart.length !== bookedTickets.length) {
        bookedTickets.forEach((ticket) => {
          removeFromCart(ticket.ticketCode);
        });
      } else {
        clearCart();
      }
      clearBookedTickets();

      handleOpenMessageModal();
    } catch (error) {
      console.error("Error updating tickets:", error);
      setError("Failed to book tickets.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleManageDataSuccess = () => {
    return;
  };

  return (
    <>
      {/* Tampilkan pesan error jika terjadi kesalahan */}
      {showError && error && (
        <GlobalError error={error} onClose={() => setShowError(false)} />
      )}

      <div className="w-full xl:w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-slate-500 mb-2">My Cart</h1>
        <hr />
      </div>

      {loading ? (
        <Loading />
      ) : cart && cart.length > 0 ? (
        <>
          <div className="w-full xl:w-[80%] mx-auto">
            <ul className="mt-8">
              {cart.map((ticket) => (
                <li key={ticket.ticketCode}>
                  <CartItem cartTicket={ticket} />
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center">
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded shadow-lg  hover:bg-blue-600 transition duration-300 ease-in-out mt-8 ${
                  bookedTickets.length === 0
                    ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                    : ""
                } `}
                onClick={handleBookTicket}
                disabled={bookedTickets.length === 0}
              >
                Book Tickets
              </button>
            </div>
          </div>
        </>
      ) : (
        <CartEmpty />
      )}

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        title="Booking Success"
        message="Tickets have been booked successfully"
        onManageDataSuccess={handleManageDataSuccess}
      />
    </>
  );
};

export default Carts;
