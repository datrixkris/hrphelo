import Button from "@/app/components/Button";
import React from "react";
import CompanyTable from "./components/CompanyTable";

const page = () => {
  const companies = [
    {
      id: 1,
      companyName: "Tech Innovators Ltd",
      location: "San Francisco, USA",
      noOfStaff: 120,
      dateRegistered: "2020-05-15",
    },
    {
      id: 2,
      companyName: "Green Energy Corp",
      location: "Berlin, Germany",
      noOfStaff: 350,
      dateRegistered: "2018-10-01",
    },
    {
      id: 3,
      companyName: "AI Solutions",
      location: "Tokyo, Japan",
      noOfStaff: 85,
      dateRegistered: "2019-07-23",
    },
    {
      id: 4,
      companyName: "FinTech World",
      location: "London, UK",
      noOfStaff: 500,
      dateRegistered: "2017-03-12",
    },
  ];

  return (
    <div className="space-y-5">
      {/* onboard a company */}
      <div className="flex justify-end">
        <Button icon="mdi:office-building-plus-outline">
          Onboard a company
        </Button>
      </div>

      {/* Company lists */}
      <div className="">
        {true ? (
          <div className="py-10">
            <CompanyTable companies={companies} />
          </div>
        ) : (
          <div className="rounded py-20 text-center">
            No companies available
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
