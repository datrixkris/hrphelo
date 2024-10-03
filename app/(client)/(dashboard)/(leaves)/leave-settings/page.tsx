// import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
// import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="leave settings"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Leave settings" },
          ]}
        />
        <div></div>
      </div>
    </div>
  );
};

export default Page;
