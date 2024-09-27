"use client";

import React from "react";
import { useParams } from "next/navigation";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffDetailsCard from "../components/StaffDetailsCard";

const Page = () => {
  const params = useParams();
  return (
    <div>
      {/* header plus breadcrumbs */}
      <PageTitleWithCrumbs
        title="staff profile"
        crumbs={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Staff", link: "/staff" },
          { name: "staff profile" },
        ]}
      />

      {/* profile details */}
      <div className="my-5">
        <StaffDetailsCard />
        <div className="border-b border-base-300 bg-base-100">
          <div className="px-5">
            <div className="flex">
              <a
                className={`inline-block px-4 py-2.5 capitalize ${true && "border-b-2 border-hr-yellow text-hr-yellow"}`}
              >
                Profile
              </a>
              <a href="#" className="inline-block px-4 py-2.5 capitalize">
                Projects
              </a>
              <a href="#" className="inline-block px-4 py-2.5 capitalize">
                Bank and Statutory
              </a>
              <a href="#" className="inline-block px-4 py-2.5 capitalize">
                Assets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
