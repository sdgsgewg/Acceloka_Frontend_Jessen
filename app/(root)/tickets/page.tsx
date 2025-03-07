"use client";
import React from "react";
import { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import ITicket from "@/app/interface/ITicket";
import TicketList from "@/app/components/Tickets/TicketList";
import GlobalError from "@/app/global-error";
import Loading from "@/app/loading";
import Pagination from "@/app/components/Tickets/Pagination";
import TicketNotFound from "@/app/components/Tickets/TicketNotFound";
import IFilterParams from "@/app/interface/IFilterParams";
import SearchBox from "@/app/components/Tickets/SearchBox";
import FilterBox from "@/app/components/Tickets/FilterBox";

const Tickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // State for searching and filtering
  const [filters, setFilters] = useState<IFilterParams>({
    searchValue: "",
    price: "",
    minEventDate: "",
    maxEventDate: "",
    orderBy: "TicketCode",
    orderState: "asc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const ticketsPerPage = 10;

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowError(false);

      // Ambil data tiket dengan pagination
      const response = await api.get(`/get-available-ticket`, {
        params: {
          categoryName: filters.searchValue,
          ticketCode: filters.searchValue,
          ticketName: filters.searchValue,
          maxPrice: filters.price,
          minEventDate: filters.minEventDate,
          maxEventDate: filters.maxEventDate,
          orderBy: filters.orderBy,
          orderState: filters.orderState,
          pageNumber: currentPage,
          ticketsPerPage: ticketsPerPage,
        },
      });

      console.log(response.data);

      if (response.data?.tickets && Array.isArray(response.data.tickets)) {
        setTickets(response.data.tickets || []);
        setTotalPages(Math.ceil(response.data.totalTickets / ticketsPerPage));
      } else {
        setTickets([]);
        console.error("Invalid API response format:", response.data);
        setError("Invalid API response format");
        setShowError(true);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage]);

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-500 mb-2">All Tickets</h1>
      </div>

      <div className="flex items-center justify-center mt-4 mb-8">
        <div className="w-full sm:w-[80%] md:w-[70%] xl:w-[60%] flex items-center justify-center gap-4">
          {/* Search Box */}
          <SearchBox
            filters={filters}
            setFilters={setFilters}
            fetchTickets={fetchTickets}
          />
          {/* Filter Box */}
          <FilterBox
            isOpen={isModalOpen}
            onOpen={handleOpenModal}
            onClose={handleCloseModal}
            filters={filters}
            setFilters={setFilters}
            fetchTickets={fetchTickets}
          />
        </div>
      </div>

      {/* Tampilkan pesan error jika terjadi kesalahan */}
      {showError && error && (
        <GlobalError error={error} onClose={() => setShowError(false)} />
      )}

      {loading ? (
        <Loading />
      ) : tickets && tickets.length > 0 ? (
        <>
          <TicketList tickets={tickets} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <TicketNotFound />
      )}
    </div>
  );
};

export default Tickets;
