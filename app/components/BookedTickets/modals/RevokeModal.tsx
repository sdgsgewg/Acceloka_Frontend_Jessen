import ITicketDetail from "@/app/interface/ITicketDetail";
import api from "@/lib/apiClient";

interface RevokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleOpenMessageModal: () => void;
  bookedTicketId: number;
  ticketDetail: ITicketDetail;
  revokeAmount: number;
  setRevokeAmount: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  message: string;
}

const RevokeModal: React.FC<RevokeModalProps> = ({
  isOpen,
  onClose,
  handleOpenMessageModal,
  bookedTicketId,
  ticketDetail,
  revokeAmount,
  setRevokeAmount,
  title,
  message,
}) => {
  if (!isOpen) return null;

  const minusQty = () => {
    setRevokeAmount((prev) => Math.max(1, prev - 1));
  };

  const addQty = () => {
    setRevokeAmount((prev) => Math.min(ticketDetail.quantity, prev + 1));
  };

  const revokeTicket = async (
    bookedTicketId: number,
    ticketCode: string | undefined
  ) => {
    if (!ticketCode) {
      console.error("Ticket code is missing.");
      return;
    }

    try {
      const response = await api.delete(
        `/revoke-ticket/${bookedTicketId}/${ticketCode}/${revokeAmount}`
      );

      if (response.status === 200) {
        console.log("Ticket revoked successfully:", response.data);

        // Close the revoke modal
        onClose();

        // Open the message modal
        handleOpenMessageModal();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error revoking ticket:", error);
    }
  };

  return (
    <div
      className={`${
        !isOpen
          ? "hidden"
          : "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-gray-600 font-bold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        {/* Ticket Detail */}
        <div className="flex flex-col mt-2">
          <p className="text-gray-500 font-semibold">Ticket Detail</p>
          <p className="text-gray-500 text-sm">{ticketDetail.ticketName}</p>
          <p className="text-gray-500 text-sm">
            Quantity: {ticketDetail.quantity}
          </p>
        </div>

        <p className="text-gray-600 my-2">
          Amount of ticket you want to revoke
        </p>
        <div className="flex items-center text-black">
          {/* Minus button */}
          <div className="border-2 border-gray-100 px-2 rounded-s-lg">
            <button
              onClick={minusQty}
              className={`${
                revokeAmount === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700"
              }`}
              disabled={revokeAmount === 1}
            >
              -
            </button>
          </div>

          {/* Quantity of Item */}
          <div className="border-y-2 border-gray-100 px-4">
            <p className="text-gray-600">{revokeAmount}</p>
          </div>

          {/* Add Button */}
          <div className="border-2 border-gray-100 px-2 rounded-e-lg">
            <button
              onClick={addQty}
              className={`${
                revokeAmount === ticketDetail.quantity
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700"
              }`}
              disabled={revokeAmount === ticketDetail.quantity}
            >
              +
            </button>
          </div>
        </div>

        {revokeAmount === ticketDetail.quantity ? (
          <p className="text-red-500 text-sm mt-1">
            You have meet the maximum quantity
          </p>
        ) : (
          ""
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              revokeTicket(bookedTicketId, ticketDetail.ticketCode)
            }
            className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevokeModal;
