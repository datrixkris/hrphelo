"use client";

import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import AddDesignationForm from "./components/AddDesignationForm";
import DesignationList from "./components/DesignationList";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      {/* header plus breadcrumbs */}
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="designations"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Designations" },
          ]}
        />

        {/* add designation button */}
        <div>
          <Button onClick={() => setOpenModal(true)}>
            <span className="flex items-center gap-1">
              <Icon icon="heroicons:user-plus" className="text-xl" /> Add
              Designation
            </span>
          </Button>
        </div>
      </div>

      {/* designation list */}
      <div className="my-5">
        <DesignationList />
      </div>

      {/* designation form */}
      {openModal && (
        <AddDesignationForm
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Page;
