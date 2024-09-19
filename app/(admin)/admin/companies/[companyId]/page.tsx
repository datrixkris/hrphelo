"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCompanyStore } from "../company-store";
import { useForm } from "react-hook-form";
import { Company } from "../types";
import Button from "@/app/components/Button";
// import Button from '@/app/components/Button';

const Page = () => {
  const params = useParams();
  const fetchCompanyById = useCompanyStore((state) => state.fetchCompanyById);
  const loading = useCompanyStore((state) => state.loading);
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
  const { register, reset } = useForm<Company>();

  useEffect(() => {
    if (params.companyId) {
      const fetchData = async () => {
        try {
          console.log(params.companyId);
          const data = await fetchCompanyById(Number(params.companyId));
          console.log(data);
          setCompanyDetails(data);
          reset({
            name: data.name,
            address: data.address,
            contact_person: data.contact_person,
            contact_person_contact: data.contact_person_contact,
            company_size: data.company_size,
            email: data.email,
            contact: data.contact,
          });
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, []);

  if (loading) {
    return <div>Fetching company details...</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold">{companyDetails?.name}</h2>
        <Button>Edit Details</Button>
      </div>

      {/* details */}
      <div className="mt-20 space-y-6 text-sm">
        {/* company details */}
        <div className="">
          {/* header */}
          <div className="border-b border-base-300 pb-2">
            <h3 className="text-xl font-semibold">Company details</h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s details here
            </p>
          </div>

          {/* forms */}
          <div className="space-y-4 py-5">
            {/* Company details */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Company name</h3>
                <p className="text-neutral-400">Update company&apos;s name</p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Company Address</h3>
                <p className="text-neutral-400">
                  Update company&apos;s address
                </p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("address")}
                />
              </div>
            </div>

            {/* Company's contact */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Company telephone</h3>
                <p className="text-neutral-400">
                  Update company&apos;s telephone contact
                </p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("contact")}
                />
              </div>
            </div>

            {/* email address */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Company email address</h3>
                <p className="text-neutral-400">
                  Update company&apos;s email address
                </p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("email")}
                />
              </div>
            </div>

            {/* size  */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Company size </h3>
                <p className="text-neutral-400">Update company&apos;s size</p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("company_size")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact person details */}
        <div className="">
          {/* header */}
          <div className="border-b border-base-300 pb-2">
            <h3 className="text-xl font-semibold">
              Contact Person&apos;s details
            </h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s details here
            </p>
          </div>

          {/* forms */}
          <div className="space-y-4 py-5">
            {/* Contact person details */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Contact person&apos;s name</h3>
                <p className="text-neutral-400">
                  Update contact person&apos;s name
                </p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("contact_person")}
                />
              </div>
            </div>

            {/* Contact person&apos;s phone */}
            <div className="flex max-w-[1000px] gap-2">
              {/* text */}
              <div className="w-1/2">
                <h3 className="font-semibold">Contact person&apos;s phone </h3>
                <p className="text-neutral-400">
                  Update contact person&apos;s phone
                </p>
              </div>

              {/* form */}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("contact_person_contact")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company documents */}
        <div className="">
          {/* header */}
          <div className="flex items-end justify-between border-b border-base-300 pb-2">
            <div className="">
              <h3 className="text-xl font-semibold">Company documents</h3>
              <p className="mt-1 text-neutral-400">
                Update company&apos;s documents
              </p>
            </div>

            <Button>Update Company Documents</Button>
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
                  type="file"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Directors Id documents */}
        <div className="">
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
        </div>
      </div>
    </div>
  );
};

export default Page;
