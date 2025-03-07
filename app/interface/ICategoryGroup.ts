import ITicketDetail from "./ITicketDetail";

interface ICategoryGroup {
  qtyPerCategory: number;
  categoryName: string;
  tickets: ITicketDetail[];
}

export default ICategoryGroup;
