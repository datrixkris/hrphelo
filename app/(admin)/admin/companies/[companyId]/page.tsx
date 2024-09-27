"use client";

import React, { useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCompanyStore } from "../company-store";
// import { useForm } from "react-hook-form";
import { Company } from "../types";
import Button from "@/app/components/Button";
import UpdateCompanyDetails from "../components/UpdateCompanyDetails";
import UpdateContactPersonDetails from "../components/UpdateContactPersonDetails";
import UpdateCompanyDocuments from "../components/UpdateCompanyDocuments";
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
        <form className="">
          {/* header */}
          <div className="flex items-end justify-between border-b border-base-300 pb-2">
            <div className="">
              <h3 className="text-xl font-semibold">
                Company Director&apos;s Identification
              </h3>
              <p className="mt-1 text-neutral-400">
                Update company&apos;s directors
              </p>
            </div>
            <Button>Update Director(s) Ids</Button>
          </div>

          {/* forms */}
          <div className="space-y-4 py-5">
            {/* Contact person details */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Business Certificate</h3>
                <p className="text-neutral-400">Select business certificate</p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="input"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
