"use client";

import React, { useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCompanyStore } from "../company-store";
// import { useForm } from "react-hook-form";
import { Company } from "../types";
import UpdateCompanyDetails from "../components/UpdateCompanyDetails";
import UpdateContactPersonDetails from "../components/UpdateContactPersonDetails";
import UpdateCompanyDocuments from "../components/UpdateCompanyDocuments";
import UpdateDirectorDetails from "../components/UpdateDirectorDetails";
// import Button from '@/app/components/Button';

const Page = () => {
  const params = useParams();
  const fetchCompanyById = useCompanyStore((state) => state.fetchCompanyById);
  const loading = useCompanyStore((state) => state.loading);
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);

  useLayoutEffect(() => {
    if (params.companyId) {
      const fetchData = async () => {
        try {
          await fetchAndSetData();
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [params.companyId]);

  async function fetchAndSetData() {
    console.log(params.companyId);
    const data = await fetchCompanyById(Number(params.companyId));
    console.log(data);
    setCompanyDetails(data);
  }

  if (loading) {
    return <div>Fetching company details...</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold">{companyDetails?.name}</h2>
      </div>

      {/* details */}
      <div className="mt-20 space-y-6 text-sm">
        {/* company details */}
        <UpdateCompanyDetails
          data={companyDetails}
          id={Number(params.companyId)}
          refreshData={fetchAndSetData}
        />

        {/* Contact person details */}
        <UpdateContactPersonDetails
          data={companyDetails}
          id={Number(params.companyId)}
          refreshData={fetchAndSetData}
        />

        {/* Company documents */}
        <UpdateCompanyDocuments />

        {/* Directors Id documents */}
        <UpdateDirectorDetails />
      </div>
    </div>
  );
};

export default Page;
