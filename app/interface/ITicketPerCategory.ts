import ITicket from "./ITicket";

interface ITicketPerCategory {
  categoryName: string;
  tickets: ITicket[];
}

export default ITicketPerCategory;
