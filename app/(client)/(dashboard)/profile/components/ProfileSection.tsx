import { Icon } from "@iconify/react/dist/iconify.js";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { useState } from "react";
import { EmergencyContactsForm } from "./EmergencyContactsForm";
import { BankInformationForm } from "./BankInformationForm";

const ProfileSection = ({
  title,
  content,
  infoType,
  profileComplete,
}: {
  title: string;
  content: React.ReactNode;
  infoType: "personal" | "emergency" | "bank";
  profileComplete: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`relative rounded-lg bg-base-100 px-5 py-5 ${!profileComplete && "border border-error"}`}
    >
      {!profileComplete && (
        <div className="absolute -top-[10px] rounded-md border border-error bg-error px-0.5 text-xs text-white">
          Complete your profile
        </div>
      )}
      <div className="flex justify-between py-3">
        <p className="text-2xl">{title}</p>
        <button
          className="rounded-full border bg-primary p-2"
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
