import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/app/components/Modal";
import { useDepartmentStore } from "../../departments/department-store";
import TabNavigation from "@/app/components/TabNavigation";
import { useStaffStore } from "../../staff/staff-store";
import { StaffData, StaffDetail } from "../../staff/types";
import UserPermissions from "./UserPermissions";
import UserBasicInformation from "./UserBasicInformation";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  staffDetails: StaffData;
  refreshData?: () => Promise<void>;
}

const UserForm = ({
  isOpen,
  onClose,
  staffDetails,
  // refreshData,
}: UserFormProps) => {
  const { updatingData, error, updateStaffDetails } = useStaffStore();
  const tabs = ["Permissions", "Basic Information"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleBasicInfoSubmit = async (staffData: StaffDetail) => {
    if (staffDetails?.id) {
      await updateStaffDetails(staffData, staffDetails.id);
    } else {
      alert("cannot find staff id to fetch data");
    }
    if (!useStaffStore.getState().error) {
      console.log(error, updatingData);
      // onClose();
      //   await refreshData();
      toast.success("Staff data updated");
      onClose();
    } else {
      toast.error(useStaffStore.getState().error);
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Staff Account</h2>

          <div className="mb-8">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
              }}
            />
          </div>

          {activeTab === "Basic Information" && (
            <div>
              <UserBasicInformation
                staffDetails={staffDetails}
                onBasicInfoSubmit={handleBasicInfoSubmit}
              />
            </div>
          )}

          {activeTab === "Permissions" && (
            <div>
              <UserPermissions />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;
