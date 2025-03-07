import { useCart } from "@/app/context/CartContext";
import ITicket from "@/app/interface/ITicket";

interface AddToCartModalProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose: () => void;
  handleOpenMessageModal: () => void;
  ticket: ITicket;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  message: string;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  setIsModalOpen,
  onClose,
  handleOpenMessageModal,
  ticket,
  quantity,
  setQuantity,
  title,
  message,
}) => {
  // Use Cart Context
  const { addToCart, addToBookedTickets } = useCart();

  if (!isOpen) return null;

  const minusQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const addQty = () => {
    setQuantity((prev) => Math.min(ticket.quota, prev + 1));
  };

  const handleAddTicket = () => {
    addToCart({ ticketCode: ticket.ticketCode, quantity: quantity });
    addToBookedTickets({ ticketCode: ticket.ticketCode, quantity: quantity });
    setIsModalOpen(false);
    handleOpenMessageModal();
  };

  return (
    <div
      className={`${
        !isOpen
          ? "invisible"
          : "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-gray-600 font-bold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        {/* Ticket Detail */}
        <div className="flex flex-col mt-2">
          <p className="text-gray-500 font-semibold">Ticket Detail</p>
          <p className="text-gray-500 text-sm">{ticket.ticketName}</p>
          <p className="text-gray-500 text-sm">Quota: {ticket.quota}</p>
        </div>

        <p className="text-gray-600 my-2">Quantity</p>
        <div className="flex items-center text-black">
          {/* Minus button */}
          <div className="border-2 border-gray-100 px-2 rounded-s-lg">
            <button
              onClick={minusQty}
              className={`${
                quantity === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700"
              }`}
              disabled={quantity === 1}
            >
              -
            </button>
          </div>

          {/* Quantity of Item */}
          <div className="border-y-2 border-gray-100 px-4">
            <p className="text-gray-600">{quantity}</p>
          </div>

          {/* Add Button */}
          <div className="border-2 border-gray-100 px-2 rounded-e-lg">
            <button
              onClick={addQty}
              className={`${
                quantity === ticket.quota
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700"
              }`}
              disabled={quantity === ticket.quota}
            >
              +
            </button>
          </div>
        </div>

        {quantity === ticket.quota ? (
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
            className="bg-blue-500 px-3 py-1 rounded-lg text-white hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleAddTicket}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
