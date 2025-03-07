import IFilterParams from "@/app/interface/IFilterParams";
import React from "react";
import FilterModal from "./modals/FilterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface FilterBoxProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: IFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<IFilterParams>>;
  fetchTickets: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  isOpen,
  onOpen,
  onClose,
  filters,
  setFilters,
  fetchTickets,
}) => {
  return (
    <>
      <div className="w-[10%]">
        <button
          className="bg-gray-500 text-white rounded-xl shadow-md px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={onOpen}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div>
      <FilterModal
        isOpen={isOpen}
        onClose={onClose}
        filters={filters}
        setFilters={setFilters}
        fetchTickets={fetchTickets}
      />
    </>
  );
};

export default FilterBox;
