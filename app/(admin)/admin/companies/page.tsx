import Button from "@/app/components/Button";
import React from "react";

const page = () => {
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
          <div className="py-10">Company list</div>
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
