import React from "react";

const TicketBox = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="w-[100%]">{children}</div>;
};

export default TicketBox;
