import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="Manage Staff Leaves"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Manage leaves" },
          ]}
        />
        <div>
          <Button>
            <span className="flex items-center gap-1">
              <Icon icon="hugeicons:calendar-add-01" className="text-xl" /> Add
              Leave
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
