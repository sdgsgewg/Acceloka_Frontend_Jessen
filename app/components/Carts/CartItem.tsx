"use client";
import { useCart } from "@/app/context/CartContext";
import ICartTicket from "@/app/interface/IModifiedTicket";
import ITicket from "@/app/interface/ITicket";
import api from "@/lib/apiClient";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CartItemProps {
  cartTicket: ICartTicket;
}

const CartItem: React.FC<CartItemProps> = ({ cartTicket }) => {
  const {
    removeFromCart,
    addQty,
    minusQty,
    bookedTickets,
    addToBookedTickets,
    removeFromBookedTickets,
  } = useCart();
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [ticketImage, setTicketImage] = useState("/img/default.jpg");
  const [isChecked, setIsChecked] = useState(() =>
    bookedTickets.some((bt) => bt.ticketCode === cartTicket.ticketCode)
  );

  // Ketika checkbox berubah, jalankan fetch data jika checkbox diaktifkan
  useEffect(() => {
    let isMounted = true; // untuk memastikan state hanya diperbarui jika komponen masih ter-mount

    const fetchTicketDetail = async () => {
      const ticketCode = cartTicket.ticketCode;
      if (!ticketCode) return;

      try {
        const response = await api.get(`/get-single-ticket/${ticketCode}`);
        if (response.data?.ticket && isMounted) {
          setTicket(response.data.ticket);

          const lowerCategoryName =
            response.data.ticket.categoryName.toLocaleLowerCase();

          switch (lowerCategoryName) {
            case "transportasi darat":
              setTicketImage("/img/transportasi-darat.jpg");
              break;
            case "transportasi laut":
              setTicketImage("/img/transportasi-laut.jpeg");
              break;
            case "cinema":
              setTicketImage("/img/cinema.jpg");
              break;
            case "hotel":
              setTicketImage("/img/hotel.jpg");
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTicketDetail();

    return () => {
      isMounted = false;
    };
  }, [cartTicket.ticketCode]);

  const handleCheckbox = () => {
    setIsChecked((prevChecked) => {
      if (prevChecked) {
        removeFromBookedTickets(cartTicket.ticketCode);
      } else {
        addToBookedTickets({
          ticketCode: cartTicket.ticketCode,
          quantity: cartTicket.quantity,
        });
      }
      return !prevChecked;
    });
  };

  return (
    <div
      className={`bg-white flex items-center gap-2 px-3 py-3 rounded-md transition duration-300 mb-4 ${
        isChecked ? "border-2 border-blue-500 shadow-md" : "border"
      } `}
    >
      {/* Checkbox */}
      <div className="w-5 flex-none">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckbox}
          className="w-5 h-5 accent-blue-500 cursor-pointer"
        />
      </div>
      <div className="w-95 flex-1 flex gap-8 px-2">
        <div className="w-21 flex-none">
          <Image
            src={ticketImage}
            alt={ticket?.categoryName ?? "No Category"}
            width={150}
            height={150}
          />
        </div>
        <div className="w-79 flex-1 flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-xl font-semibold">
              {ticket?.ticketName}
            </p>

            {/* Quantity */}
            <div className="flex items-center text-black">
              {/* Minus button */}
              <div className="border-2 border-gray-100 px-2 rounded-s-lg">
                <button
                  onClick={() => minusQty(cartTicket)}
                  className={`${
                    cartTicket.quantity === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                  disabled={cartTicket.quantity === 1}
                >
                  -
                </button>
              </div>

              {/* Quantity of Item */}
              <div className="border-y-2 border-gray-100 px-4">
                <p className="text-gray-600">{cartTicket.quantity}</p>
              </div>

              {/* Add Button */}
              <div className="border-2 border-gray-100 px-2 rounded-e-lg">
                <button
                  onClick={() => addQty(cartTicket)}
                  className={`${
                    cartTicket.quantity === ticket?.quota
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                  disabled={cartTicket.quantity === ticket?.quota}
                >
                  +
                </button>
              </div>
            </div>

            {cartTicket.quantity === ticket?.quota ? (
              <p className="text-red-500 text-sm mt-1">
                You have meet the maximum quantity
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-end justify-end mt-auto">
            <button
              className="bg-red-500 px-2 py-1 border rounded-md text-white text-sm hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={() => removeFromCart(ticket?.ticketCode ?? "")}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
