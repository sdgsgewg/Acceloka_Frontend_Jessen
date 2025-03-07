import React, { useState, useEffect } from "react";
import RevokeModal from "@/app/components/BookedTickets/modals/RevokeModal";
import ITicketDetail from "@/app/interface/ITicketDetail";
import api from "@/lib/apiClient";
import ITicket from "@/app/interface/ITicket";
import IUpdatedTicket from "@/app/interface/IModifiedTicket";
import Image from "next/image";
import MessageModal from "../modals/MessageModal";
import getTicketImage from "@/app/utils/getTicketImage";

interface TicketItemProps {
  bookedTicketId: number;
  ticketDetail: ITicketDetail;
  isEditing: boolean;
  isRevoking: boolean;
  onUpdateTicket: (updatedTicket: IUpdatedTicket) => void;
  errorMsg: string;
  onManageDataSuccess: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({
  bookedTicketId,
  ticketDetail,
  isEditing,
  isRevoking,
  onUpdateTicket,
  errorMsg,
  onManageDataSuccess,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [ticketImage, setTicketImage] = useState("/img/default.jpg");
  const [ticket, setTicket] = useState<ITicket | null>(null);

  // Update State
  const [newQuantity, setNewQuantity] = useState<number | null>(null);
  const [updatedTicket, setUpdatedTicket] = useState<IUpdatedTicket | null>(
    null
  );

  // Revoke State
  const [revokeAmount, setRevokeAmount] = useState(1);

  // State for modal
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const handleOpenRevokeModal = () => setIsRevokeModalOpen(true);
  const handleCloseRevokeModal = () => setIsRevokeModalOpen(false);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleOpenMessageModal = () => setIsMessageModalOpen(true);
  const handleCloseMessageModal = () => setIsMessageModalOpen(false);

  // Ketika checkbox berubah, jalankan fetch data jika checkbox diaktifkan
  useEffect(() => {
    const fetchTicketDetail = async () => {
      const ticketCode = ticketDetail.ticketCode;
      if (!ticketCode) return;

      try {
        const response = await api.get(`/get-single-ticket/${ticketCode}`);
        if (response.data?.ticket) {
          setTicket(response.data.ticket);
          const categoryName = response.data.ticket.categoryName;
          const ticketName = response.data.ticket.ticketName.split(" ")[0];
          setTicketImage(getTicketImage(categoryName, ticketName));
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTicketDetail();
  }, [ticketDetail.ticketCode]);

  useEffect(() => {
    if (!isEditing) {
      setIsChecked(false);
      setNewQuantity(null);
    }
  }, [isEditing]);

  useEffect(() => {
    // untuk menambah list tiket yang ingin diupdate
    if (updatedTicket) {
      onUpdateTicket(updatedTicket);
    }
  }, [updatedTicket]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setNewQuantity(null);
      setUpdatedTicket({ ticketCode: ticketDetail.ticketCode, quantity: 0 }); // Atur ke 0 jika kosong
      return;
    }

    const quantity = parseInt(value, 10);
    if (!isNaN(quantity)) {
      setNewQuantity(quantity);
      setUpdatedTicket({ ticketCode: ticketDetail.ticketCode, quantity });
    }
  };

  return (
    <>
      <div
        className={`w-full flex items-center gap-2 px-3 py-3 rounded-md transition duration-300 mb-4 ${
          isChecked ? "border-2 border-blue-500 shadow-md" : "border"
        } `}
      >
        {/* Checkbox */}
        {isEditing && (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
        )}

        {/* Informasi Tiket */}
        <div className="flex items-center gap-4 w-full px-2">
          <div className="w-[30%]">
            <Image
              src={ticketImage}
              alt={ticket?.categoryName ?? "No Category Name"}
              width={120}
              height={50}
            />
          </div>
          <div className="w-[70%]">
            <p className="text-gray-500 font-semibold">
              {ticketDetail.ticketName}
            </p>
            <p className="text-gray-500 text-sm">
              Ticket Code: {ticketDetail.ticketCode}
            </p>
            <p className="text-gray-500 text-sm">
              Event Date:{" "}
              {new Date(ticketDetail.eventDate).toLocaleDateString("en-EN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-500 text-sm">
              Quantity: {ticketDetail.quantity}
            </p>

            {/* Jika checkbox aktif, tampilkan input quantity */}
            {isEditing && isChecked && ticket && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="newQty" className="text-gray-500 text-sm">
                    New Quantity:
                  </label>
                  <input
                    className="border border-gray-300 px-2 py-1 rounded-md text-black text-sm"
                    type="text"
                    name="newQty"
                    id="newQty"
                    placeholder="Input new quantity..."
                    value={newQuantity ?? ""}
                    onChange={handleQuantityChange}
                  />
                </div>
                <div>
                  <small className="text-gray-400 italic text-xs">
                    *The maximum quota for this ticket is: {ticket.quota}
                  </small>
                </div>
                <div>
                  <small className="text-red-500 text-xs">{errorMsg}</small>
                </div>
                {/* {errorMessage !== "" && (
                )} */}
              </>
            )}

            {/* Tombol Revoke */}
            {isRevoking && (
              <button
                className="bg-red-500 px-2 py-1 border rounded-md text-white hover:bg-red-600 transition duration-300 ease-in-out text-sm mt-2"
                onClick={handleOpenRevokeModal}
              >
                Revoke
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Revoke Modal */}
      <RevokeModal
        isOpen={isRevokeModalOpen}
        onClose={handleCloseRevokeModal}
        handleOpenMessageModal={handleOpenMessageModal}
        bookedTicketId={bookedTicketId}
        ticketDetail={ticketDetail}
        revokeAmount={revokeAmount}
        setRevokeAmount={setRevokeAmount}
        title="Revoke Ticket"
        message="Are you sure you want to revoke this ticket? This action cannot be undone."
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        title="Revoke Success"
        message={`Ticket with name: ${ticket?.ticketName} has been revoked successfully with a quantity of ${revokeAmount}`}
        onManageDataSuccess={onManageDataSuccess}
      />
    </>
  );
};

export default TicketItem;
