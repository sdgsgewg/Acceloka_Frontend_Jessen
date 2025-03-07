import ICategoryGroup from "@/app/interface/ICategoryGroup";
import TicketItem from "./TicketItem";

interface BookedTicketProps {
  bookedTicketId: number;
  bookedTicket: ICategoryGroup[];
  isEditing: boolean;
  isRevoking: boolean;
  setUpdatedTickets: React.Dispatch<
    React.SetStateAction<{ ticketCode: string; quantity: number }[]>
  >;
  errorMessages: string[];
  onManageDataSuccess: () => void;
}

const TicketDetail: React.FC<BookedTicketProps> = ({
  bookedTicketId,
  bookedTicket,
  isEditing,
  isRevoking,
  setUpdatedTickets,
  errorMessages,
  onManageDataSuccess,
}) => {
  let globalIndex = 0; // Indeks global untuk errorMessages

  const handleUpdateTickets = (updatedTicket: {
    ticketCode: string;
    quantity: number;
  }) => {
    setUpdatedTickets((prev) => {
      const existingIndex = prev.findIndex(
        (t) => t.ticketCode === updatedTicket.ticketCode
      );
      if (existingIndex > -1) {
        return prev.map((ticket, index) =>
          index === existingIndex
            ? { ...ticket, quantity: updatedTicket.quantity }
            : ticket
        );
      }
      return [...prev, updatedTicket];
    });
  };

  return (
    <div
      className={`max-w-lg mx-auto p-6 border ${
        !isEditing ? "rounded-b-lg" : ""
      } shadow-lg bg-white`}
    >
      <h2 className="text-xl text-gray-800 font-semibold mb-4">
        Booked Ticket Details
      </h2>

      {bookedTicket.map((category, index) => (
        <div key={index} className="mt-4">
          <h3 className="text-lg text-gray-600 font-bold">
            {category.categoryName}
          </h3>
          <p className="text-gray-600">
            Total Ticket: {category.qtyPerCategory}
          </p>

          <div className="flex flex-col mt-2">
            {category.tickets.map((ticketDetail, idx) => {
              const currentErrorMessage = errorMessages?.[globalIndex] || "";
              globalIndex++; // Tambah indeks global
              return (
                <TicketItem
                  key={idx}
                  bookedTicketId={bookedTicketId}
                  ticketDetail={ticketDetail}
                  isEditing={isEditing}
                  isRevoking={isRevoking}
                  onUpdateTicket={handleUpdateTickets}
                  errorMsg={currentErrorMessage}
                  onManageDataSuccess={onManageDataSuccess}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketDetail;
