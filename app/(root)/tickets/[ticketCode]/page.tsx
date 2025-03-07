"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/apiClient";
import ITicket from "@/app/interface/ITicket";
import Loading from "@/app/loading";
import GlobalError from "@/app/global-error";
import TicketBox from "@/app/components/TicketBox";
import TicketNotFound from "@/app/components/Tickets/TicketNotFound";
import Image from "next/image";
import AddToCartModal from "@/app/components/Tickets/modals/AddToCartModal";
import MessageModal from "@/app/components/modals/MessageModal";
import getTicketImage from "@/app/utils/getTicketImage";

const TicketDetail = () => {
  const params = useParams();
  const ticketCode = params.ticketCode as string;

  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [ticketImage, setTicketImage] = useState<string>("/img/default.jpg");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Modal state
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const handleOpenAddToCartModal = () => setIsAddToCartModalOpen(true);
  const handleCloseAddToCartModal = () => setIsAddToCartModalOpen(false);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const handleOpenMessageModal = () => setIsMessageModalOpen(true);
  const handleCloseMessageModal = () => setIsMessageModalOpen(false);

  const fetchTicketDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowError(false);

      const response = await api.get(`/get-single-ticket/${ticketCode}`);

      if (response.data?.ticket) {
        setTicket(response.data.ticket || null);
        const categoryName = response.data.ticket.categoryName;
        setTicketImage(getTicketImage(categoryName));
      } else {
        setTicket(null);
        console.error("Invalid API response format:", response.data);

        if (response.data.title !== "Ticket Not Found") {
          setError("Invalid API response format");
          setShowError(true);
        }
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ticketCode) return;
    fetchTicketDetail();
  }, [ticketCode]);

  const handleManageDataSuccess = () => {
    return;
  };

  return (
    <>
      {/* Tampilkan pesan error jika terjadi kesalahan */}
      {showError && error && (
        <GlobalError error={error} onClose={() => setShowError(false)} />
      )}

      {loading ? (
        <Loading />
      ) : ticket ? (
        <>
          <TicketBox>
            <div className="flex items-center justify-center mb-8">
              <Image
                src={ticketImage}
                alt={ticket.categoryName}
                width={400}
                height={200}
              />
            </div>
            <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
              <h1 className="text-2xl text-gray-400 font-bold">
                {ticket.ticketName}
              </h1>
              <p className="text-gray-500">Ticket Code: {ticket.ticketCode}</p>
              <p className="text-gray-600">
                Price: Rp {ticket.price.toLocaleString("id-ID")}
              </p>
              <p className="text-gray-600">Quota: {ticket.quota}</p>
              <p className="text-gray-600">
                Event Date:{" "}
                {new Date(ticket.eventDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-600">Category: {ticket.categoryName}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 border rounded mt-4 hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={handleOpenAddToCartModal}
              >
                Add to Cart
              </button>
            </div>
          </TicketBox>
          <AddToCartModal
            isOpen={isAddToCartModalOpen}
            setIsModalOpen={setIsAddToCartModalOpen}
            onClose={handleCloseAddToCartModal}
            handleOpenMessageModal={handleOpenMessageModal}
            ticket={ticket}
            quantity={quantity}
            setQuantity={setQuantity}
            title="Add to Cart"
            message="Please input the quantity of ticket you want to add to the cart."
          />
          <MessageModal
            isOpen={isMessageModalOpen}
            onClose={handleCloseMessageModal}
            title="Add to Cart Success"
            message={`Ticket with name: ${ticket?.ticketName} has been added to cart with a quantity of ${quantity}`}
            onManageDataSuccess={handleManageDataSuccess}
          />
        </>
      ) : (
        <TicketNotFound />
      )}
    </>
  );
};

export default TicketDetail;
