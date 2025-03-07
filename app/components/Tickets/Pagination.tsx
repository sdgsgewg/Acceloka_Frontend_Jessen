import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="flex justify-center mt-16">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:opacity-50"
      >
        {`<`}
      </button>
      <span className="text-slate-500 px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:opacity-50"
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
