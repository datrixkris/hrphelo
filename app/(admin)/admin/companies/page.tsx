"use client";

import React, { useEffect } from "react";
import CompanyTable from "./components/CompanyTable";
import OnboardCompanyButton from "./components/OnboardCompanyButton";
import { useCompanyStore } from "./company-store";

const Page = () => {
  const { companies, loading, fetchCompanies } = useCompanyStore();

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading && companies.length < 1) {
    return (
      <div className="rounded py-20 text-center">Getting companies data...</div>
    );
  }

  return (
    <div className="space-y-5">
      {/* onboard a company */}
      <div className="flex justify-end">
        <OnboardCompanyButton />
      </div>

      {/* Company lists */}
      <div className="">
        {companies.length > 0 ? (
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

export default Page;
