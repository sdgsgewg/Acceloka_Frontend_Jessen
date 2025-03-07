import IFilterParams from "@/app/interface/IFilterParams";
import React from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: IFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<IFilterParams>>;
  fetchTickets: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  fetchTickets,
}) => {
  // Meng-update state ketika input berubah
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      searchValue: "",
      price: "",
      minEventDate: "",
      maxEventDate: "",
      orderBy: "TicketCode",
      orderState: "asc",
    });
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
        <div className="flex justify-between pb-2 border-b text-gray-600 font-bold">
          <h1 className="text-xl">Filter</h1>
          <button className="text-xl" onClick={onClose}>
            ✖️
          </button>
        </div>

        {/* Filtering */}
        <div className="w-full py-2">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Price */}
            <label className="text-slate-400 font-semibold" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
              name="price"
              id="price"
              value={filters.price}
              placeholder="Input price..."
              onChange={handleInputChange}
            />

            {/* Event Date */}
            <label
              className="text-slate-400 font-semibold"
              htmlFor="minEventDate"
            >
              Min Event Date
            </label>
            <input
              type="date"
              className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
              name="minEventDate"
              id="minEventDate"
              value={filters.minEventDate}
              onChange={handleInputChange}
            />

            <label
              className="text-slate-400 font-semibold"
              htmlFor="maxEventDate"
            >
              Max Event Date
            </label>
            <input
              type="date"
              className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
              name="maxEventDate"
              id="maxEventDate"
              value={filters.maxEventDate}
              onChange={handleInputChange}
            />

            {/* Order By */}
            <label className="text-slate-400 font-semibold" htmlFor="orderBy">
              Order By
            </label>
            <select
              className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
              name="orderBy"
              value={filters.orderBy}
              onChange={handleInputChange}
            >
              <option value="TicketCode">Ticket Code</option>
              <option value="TicketName">Ticket Name</option>
              <option value="CategoryName">Category Name</option>
              <option value="Price">Price</option>
              <option value="EventDate">Event Date</option>
            </select>

            {/* Order State */}
            <label
              className="text-slate-400 font-semibold"
              htmlFor="orderState"
            >
              Order State
            </label>
            <select
              className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
              name="orderState"
              value={filters.orderState}
              onChange={handleInputChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </form>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-center items-center gap-8 pt-4 border-t">
          <button
            type="button"
            className="bg-[#adadad] text-white border px-4 py-1 rounded-xl shadow-sm cursor-pointer hover:bg-[#767676] transition duration-300 ease-in-out"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white border px-4 py-1 rounded-xl shadow-sm cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={fetchTickets}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
