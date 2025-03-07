import Link from "next/link";

interface TicketActionsProps {
  isEditing: boolean;
  onEditing: () => void;
  isRevoking: boolean;
  onRevoking: () => void;
}

const TicketActions: React.FC<TicketActionsProps> = ({
  isEditing,
  onEditing,
  isRevoking,
  onRevoking,
}) => {
  return (
    <div className="bg-white flex items-center justify-between gap-4 max-w-lg mx-auto px-6 py-3 border rounded-t-lg text-sm">
      <Link href="/booked-tickets">
        <button className="bg-gray-200 px-4 py-1 border rounded-md text-black hover:bg-gray-300 transition duration-300 ease-in-out">
          Back
        </button>
      </Link>

      <div className="flex gap-4">
        <button
          onClick={onEditing}
          className="bg-yellow-400 px-4 py-1 border rounded-md text-black hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          {!isEditing ? (
            <span className="text-sm">Edit</span>
          ) : (
            <span className="text-sm">Cancel</span>
          )}
        </button>
        <button
          onClick={onRevoking}
          className="bg-red-500 px-4 py-1 border rounded-md text-white hover:bg-red-600 transition duration-300 ease-in-out"
        >
          {!isRevoking ? (
            <span className="text-sm">Revoke</span>
          ) : (
            <span className="text-sm">Cancel</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TicketActions;
