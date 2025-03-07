import React from "react";

interface UpdateSectionProps {
  isEditing: boolean;
  handleUpdate: () => void;
  isUpdating: boolean;
}

const UpdateSection: React.FC<UpdateSectionProps> = ({
  isEditing,
  handleUpdate,
  isUpdating,
}) => {
  return (
    <>
      {isEditing && (
        <div className="bg-white flex items-center justify-center max-w-lg mx-auto px-6 py-3 border rounded-b-lg text-sm">
          <button
            className="bg-yellow-400 px-4 py-1 border rounded-md text-black hover:bg-yellow-500 transition duration-300 ease-in-out"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateSection;
