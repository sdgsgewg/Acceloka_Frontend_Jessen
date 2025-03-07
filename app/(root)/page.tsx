"use client";
import api from "@/lib/apiClient";
import { useEffect, useState } from "react";
import ITicketPerCategory from "../interface/ITicketPerCategory";
import GlobalError from "../global-error";
import TicketNotFound from "../components/Tickets/TicketNotFound";
import Loading from "../loading";
import TicketPerCategoryList from "../components/Home/TicketPerCategoryList";
import Hero from "../components/Home/Hero";

export default function Home() {
  const [ticketsPerCategories, setTicketsPerCategories] = useState<
    ITicketPerCategory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const fetchTicketsByCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowError(false);

      const response = await api.get("/get-available-ticket-by-category");
      console.log(response.data);

      if (response.data?.ticketsPerCategories) {
        setTicketsPerCategories(response.data.ticketsPerCategories);
      } else {
        setTicketsPerCategories([]);
        console.error("Invalid API response format:", response.data);
        setError("Invalid API response format");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error fetching tickets by categories:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsByCategory();
  }, []);

  return (
    <>
      {/* Tampilkan pesan error jika terjadi kesalahan */}
      {showError && error && (
        <GlobalError error={error} onClose={() => setShowError(false)} />
      )}

      {loading ? (
        <Loading />
      ) : ticketsPerCategories && ticketsPerCategories.length > 0 ? (
        <div className="flex flex-col">
          <Hero />

          <TicketPerCategoryList ticketsPerCategories={ticketsPerCategories} />
        </div>
      ) : (
        <TicketNotFound />
      )}
    </>
  );
}
