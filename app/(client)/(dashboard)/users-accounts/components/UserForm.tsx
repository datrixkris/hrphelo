import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "@/app/components/Modal";
import TabNavigation from "@/app/components/TabNavigation";
import { useStaffStore } from "../../staff/staff-store";
import { StaffDetail } from "../../staff/types";
import UserPermissions from "./UserPermissions";
import UserBasicInformation from "./UserBasicInformation";
import { UserModules } from "../types";
import { useUserAccountStore } from "../user-account-store";
import { UsersInterface } from "./UsersList";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  staffDetails: UsersInterface;
  refreshData?: () => Promise<void>;
}

const UserForm = ({
  isOpen,
  onClose,
  staffDetails,
  // refreshData,
}: UserFormProps) => {
  const { updatingData, error, updateStaffDetails } = useStaffStore();
  const createUser = useUserAccountStore((state) => state.createUser);
  const tabs = ["Permissions", "Basic Information"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleBasicInfoSubmit = async (staffData: StaffDetail) => {
    if (staffDetails?.staff.id) {
      await updateStaffDetails(staffData, staffDetails.staff.id);
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

  const handlePermissionsSubmit = async (permissions: UserModules[]) => {
    const permissionsData = {
      email: staffDetails.staff.email!,
      permissions: permissions.map((item) => {
        return {
          moduleId: item.id,
          ...item.permissions,
        };
      }),
    };
    console.log(permissions);
    if (staffDetails?.staff.id) {
      await createUser(permissionsData, staffDetails.staff.id);
    } else {
      alert("cannot find staff id to fetch data");
    }
    if (!useUserAccountStore.getState().error) {
      console.log(error, updatingData);
      // onClose();
      //   await refreshData();
      toast.success("Staff data updated");
      onClose();
    } else {
      toast.error(useUserAccountStore.getState().error);
    }
  };

  return (
    <div className="overflow-auto">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full">
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
                staffDetails={staffDetails.staff}
                onBasicInfoSubmit={handleBasicInfoSubmit}
              />
            </div>
          )}

          {activeTab === "Permissions" && (
            <div>
              <UserPermissions
                userPermissions={staffDetails.permissions}
                onPermissionsSubmit={handlePermissionsSubmit}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;
