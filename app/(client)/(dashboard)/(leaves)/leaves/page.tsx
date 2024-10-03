import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="Your Leaves"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "leaves" },
          ]}
        />
        <div>
          <Button>
            <span className="flex items-center gap-1">
              <Icon icon="hugeicons:calendar-add-01" className="text-xl" />{" "}
              Apply for Leave
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
