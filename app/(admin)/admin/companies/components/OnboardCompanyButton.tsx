"use client";

import Button from "@/app/components/Button";
// import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import OnboardCompanyForm from "./OnboardCompanyForm";

const OnboardCompanyButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    // button to onboard
    <div className="">
      <div>
        <Button
          icon="mdi:office-building-plus-outline"
          onClick={() => setOpenModal(true)}
        >
          Onboard a company
        </Button>
      </div>

      {/* add company modal */}
      {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}> */}

      <OnboardCompanyForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default OnboardCompanyButton;
