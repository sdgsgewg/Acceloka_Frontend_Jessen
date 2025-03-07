import React from "react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onManageDataSuccess: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  onManageDataSuccess,
}) => {
  const hanldeButtonClick = () => {
    onClose();
    onManageDataSuccess();
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
        {/* <div className="flex flex-col mt-2">
          <p className="text-gray-500 font-semibold">Ticket Detail</p>
          <p className="text-gray-500 text-sm">{ticketDetail.ticketName}</p>
          <p className="text-gray-500 text-sm">
            Quantity: {ticketDetail.quantity}
          </p>
        </div> */}

        <div className="flex justify-center mt-4">
          <button
            onClick={hanldeButtonClick}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
