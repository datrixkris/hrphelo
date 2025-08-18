import React from "react";

const DashCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-md bg-base-100 p-3 pb-5">{children}</div>;
};

export default DashCard;
