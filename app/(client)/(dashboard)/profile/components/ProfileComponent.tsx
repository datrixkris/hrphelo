"use client";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useStaffStore } from "../staff-store";
// import { StaffProfile as ProfileType } from "../types";
import Section from "./ProfileSection";
import { StaffProfile } from "@/app/(client)/(dashboard)/(employee)/staff/types";

type TStaffProfil = {
  profile: StaffProfile | null;
};

const ProfileComponent = ({ profile }: TStaffProfil) => {
  //   const loading = useStaffStore((state) => state.loading);

  // console.log("pro", profile[0].name);

  if (false || !profile) {
    return (
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
      {/* Personal Information */}
      <Section
        infoType="personal"
        title="Personal Information"
        profileComplete={profile.personalInfoStatus}
        content={
          <table className="w-full text-[15px]">
            <tbody>
              <TableRow
                label="Alternative Contact"
                value={profile?.personalInfo?.alt_contact}
              />
              <TableRow
                label="Nationality"
                value={profile?.personalInfo?.nationality}
              />
              <TableRow
                label="Marital Status"
                value={profile?.personalInfo?.marital_status}
              />
              <TableRow
                label="No. of Children"
                value={profile?.personalInfo?.no_of_children}
              />
            </tbody>
          </table>
        }
      />

      {/* Emergency Contacts */}
      <Section
        infoType="emergency"
        title="Emergency Contacts"
        profileComplete={profile.iceContactsStatus}
        content={
          profile?.iceContacts?.length ? (
            profile.iceContacts.map((contact, index) => (
              <div key={index} className="mb-5">
                <h4 className="font-bold">{contact.relationship}</h4>
                <table className="w-full text-[15px]">
                  <tbody>
                    <TableRow label="Name" value={contact.name} />
                    <TableRow label="Contact" value={contact.contact} />
                  </tbody>
                </table>
                <hr className="my-4" />
              </div>
            ))
          ) : (
            <p className="text-neutral-400">No emergency contacts available.</p>
          )
        }
      />

      {/* Bank Information */}
      <Section
        infoType="bank"
        title="Bank Information"
        profileComplete={profile.bankInfoStatus}
        content={
          <table className="w-full text-[15px]">
            <tbody>
              <TableRow
                label="Bank Name"
                value={profile?.bankInfo?.bank_name}
              />
              <TableRow
                label="Account Number"
                value={profile?.bankInfo?.account_number}
              />
              <TableRow
                label="Bank Branch"
                value={profile?.bankInfo?.bank_branch}
              />
            </tbody>
          </table>
        }
      />
    </div>
  );
};

export default ProfileComponent;

// Reusable TableRow Component
const TableRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <tr>
    <td className="py-2 pr-3 font-semibold">{label}</td>
    <td className="text-neutral-400">{value || "N/A"}</td>
  </tr>
);

// Reusable SkeletonCard Component
const SkeletonCard = () => (
  <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
);
