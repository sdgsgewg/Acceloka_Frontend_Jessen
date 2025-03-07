import ICategoryGroup from "./ICategoryGroup";

interface IBookedTicket {
  bookedTicketId: number;
  totalPrice: number;
  bookingDate: string;
  details: ICategoryGroup[];
}

export default IBookedTicket;
