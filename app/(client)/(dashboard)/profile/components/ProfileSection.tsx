import { Icon } from "@iconify/react/dist/iconify.js";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { useState } from "react";
import { EmergencyContactsForm } from "./EmergencyContactsForm";
import { BankInformationForm } from "./BankInformationForm";

const ProfileSection = ({
  title,
  content,
  infoType,
}: {
  title: string;
  content: React.ReactNode;
  infoType: "personal" | "emergency" | "bank";
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="rounded-lg bg-base-100 px-5 py-5">
      <div className="flex justify-between py-3">
        <p className="text-2xl">{title}</p>
        <button
          className="rounded-full border bg-primary p-2 text-white"
          onClick={() => setShowModal(true)}
        >
          <Icon icon="mdi:pencil-outline" />
        </button>
      </div>
      {content}

      {infoType === "personal" && showModal && (
        <PersonalInformationForm onClose={() => setShowModal(false)} />
      )}
      {infoType === "emergency" && showModal && (
        <EmergencyContactsForm onClose={() => setShowModal(false)} />
      )}
      {infoType === "bank" && showModal && (
        <BankInformationForm onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfileSection;
