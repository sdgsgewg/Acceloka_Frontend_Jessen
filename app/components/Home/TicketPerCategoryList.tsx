import ITicketPerCategory from "@/app/interface/ITicketPerCategory";
import React from "react";
import Ticket from "../Tickets/Ticket";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface TicketPerCategoryListProps {
  ticketsPerCategories: ITicketPerCategory[];
}

const TicketPerCategoryList: React.FC<TicketPerCategoryListProps> = ({
  ticketsPerCategories,
}) => {
  return (
    <div className="">
      {ticketsPerCategories.map((tpc) => (
        <div key={tpc.categoryName} className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-600">
            {tpc.categoryName}
          </h2>
          <hr className="mt-2" />
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24} // Jarak antar item
            slidesPerView={1} // Default 1 item per slide
            navigation // Tombol navigasi
            pagination={{ clickable: true }} // Pagination bulat-bulat
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="mt-8"
          >
            {tpc.tickets.map((ticket) => (
              <SwiperSlide key={ticket.ticketCode}>
                <Ticket ticket={ticket} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default TicketPerCategoryList;
