"use client";
import BookedTicketList from "@/app/components/BookedTickets/BookedTicketList";
import BookingNotFound from "@/app/components/BookedTickets/BookingNotFound";
import Pagination from "@/app/components/Tickets/Pagination";
import GlobalError from "@/app/global-error";
import IBookedTicket from "@/app/interface/IBookedTicket";
import Loading from "@/app/loading";
import api from "@/lib/apiClient";
import React, { useEffect, useState } from "react";

const BookedTickets = () => {
  const [bookedTickets, setBookedTickets] = useState<IBookedTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const bookingsPerPage = 10;

  const fetchBookedTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowError(false);

      const response = await api.get("/get-all-booked-ticket", {
        params: {
          pageNumber: currentPage,
          bookingsPerPage: bookingsPerPage,
        },
      });

      console.log(response.data);

      if (response.data?.bookings && Array.isArray(response.data.bookings)) {
        setBookedTickets(response.data.bookings || []);
        setTotalPages(Math.ceil(response.data.totalBookings / bookingsPerPage));
      } else {
        setBookedTickets([]);
        console.error("Invalid API response format:", response.data);
        setError("Invalid API response format");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occured"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedTickets();
  }, [currentPage]);

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-500 mb-2">All Bookings</h1>
      </div>

      {/* Tampilkan pesan error jika terjadi kesalahan */}
      {showError && error && (
        <GlobalError error={error} onClose={() => setShowError(false)} />
      )}

      {loading ? (
        <Loading />
      ) : bookedTickets && bookedTickets.length > 0 ? (
        <>
          <BookedTicketList bookedTickets={bookedTickets} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <BookingNotFound />
      )}
    </div>
  );
};

export default BookedTickets;
