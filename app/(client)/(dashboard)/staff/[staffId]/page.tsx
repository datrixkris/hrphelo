"use client";

import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  return <div>Staff no - {params.staffId}</div>;
};

export default Page;
