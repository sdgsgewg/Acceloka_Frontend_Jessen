import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IFilterParams from "@/app/interface/IFilterParams";

interface SearchBoxProps {
  filters: IFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<IFilterParams>>;
  fetchTickets: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
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

  // Memanggil fetchTickets() setelah user berhenti mengetik (debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTickets();
    }, 500); // Delay 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [filters.searchValue]);

  return (
    <div className="w-[90%]">
      <form className="w-[100%]" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="w-[90%] outline-none bg-none border border-[#adadad] p-2 mt-4 mb-3 rounded-l-xl text-black"
          name="searchValue"
          id="search"
          value={filters.searchValue}
          placeholder="Search ticket by category, code, or name..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-[10%] bg-[#adadad] text-white border-none p-2 rounded-r-xl cursor-pointer hover:bg-[#767676] transition duration-300"
          onClick={fetchTickets}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
