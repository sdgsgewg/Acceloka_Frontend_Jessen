"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/apiClient";
import Loading from "@/app/loading";
import TicketBox from "@/app/components/TicketBox";
import TicketActions from "@/app/components/BookedTickets/TicketActions";
import TicketDetail from "@/app/components/BookedTickets/TicketDetail";
import ICategoryGroup from "@/app/interface/ICategoryGroup";
import IUpdatedTicket from "@/app/interface/IModifiedTicket";
import UpdateSection from "@/app/components/BookedTickets/UpdateSection";
import MessageModal from "@/app/components/modals/MessageModal";
import BookingNotFound from "@/app/components/BookedTickets/BookingNotFound";

const BookedTicketDetail = () => {
  const params = useParams();
  const bookedTicketId = Number(params.bookedTicketId);

  const [bookedTicket, setBookedTicket] = useState<ICategoryGroup[] | null>(
    null
  );
  const [updatedTickets, setUpdatedTickets] = useState<IUpdatedTicket[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  // state for message modal
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleOpenMessageModal = () => setIsMessageModalOpen(true);
  const handleCloseMessageModal = () => setIsMessageModalOpen(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const fetchTicketDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/get-booked-ticket/${bookedTicketId}`);

      if (Array.isArray(response.data)) {
        setBookedTicket(response.data);
      } else {
        setBookedTicket(null);
        console.error("Invalid API response format:", response.data);

        if (response.data.title !== "Booked Ticket Not Found") {
          setError("Invalid API response format");
        }
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditState = () => {
    if (isEditing) {
      setErrorMessages([]);
    }
    setIsEditing(!isEditing);
    if (isRevoking) {
      setIsRevoking(false);
    }
  };

  const handleRevokeState = () => {
    setIsRevoking(!isRevoking);
    if (isEditing) {
      handleEditState();
    }
  };

  const handleManageDataSuccess = () => {
    fetchTicketDetail();
  };

  useEffect(() => {
    if (!bookedTicketId || isNaN(bookedTicketId)) return;
    fetchTicketDetail();
  }, [bookedTicketId]);

  const handleUpdate = async () => {
    if (updatedTickets.length === 0) return;

    try {
      setIsUpdating(true);
      setError(null);

      const response = await api.put(`/edit-booked-ticket/${bookedTicketId}`, {
        tickets: updatedTickets,
      });

      if (response.data.status && response.data.status !== 200) {
        setError("Invalid API response format");
        console.log("Update Response:", response.data);
        setErrorMessages(response.data.errors);
        return;
      }
      handleOpenMessageModal();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating tickets:", error);
      setError("Failed to update tickets.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : bookedTicket && bookedTicket.length > 0 ? (
        <>
          <TicketBox>
            <TicketActions
              isEditing={isEditing}
              onEditing={handleEditState}
              isRevoking={isRevoking}
              onRevoking={handleRevokeState}
            />
            <TicketDetail
              bookedTicketId={bookedTicketId}
              bookedTicket={bookedTicket}
              isEditing={isEditing}
              isRevoking={isRevoking}
              setUpdatedTickets={setUpdatedTickets}
              errorMessages={errorMessages}
              onManageDataSuccess={handleManageDataSuccess}
            />

            <UpdateSection
              isEditing={isEditing}
              handleUpdate={handleUpdate}
              isUpdating={isUpdating}
            />
          </TicketBox>

          <MessageModal
            isOpen={isMessageModalOpen}
            onClose={handleCloseMessageModal}
            title="Update Success"
            message="Booked tickets' quantity has been updated successfully"
            onManageDataSuccess={handleManageDataSuccess}
          />
        </>
      ) : (
        <BookingNotFound />
      )}
    </>
  );
};

export default BookedTicketDetail;
