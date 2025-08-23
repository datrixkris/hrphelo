import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "@/app/components/Modal";
import TabNavigation from "@/app/components/TabNavigation";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import { StaffDetail } from "@/app/(client)/(dashboard)/(employee)/staff/types";
// import UserPermissions from "./UserPermissions";
import UserBasicInformation from "./UserBasicInformation";
// import { UserModules } from "../types";
import { useUserAccountStore } from "../user-account-store";
import { UsersInterface } from "./UsersList";
import UserRoles from "./UserRoles";
import { Permission } from "../../roles-permissions/types";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  staffDetails: UsersInterface;
  refreshData: () => Promise<void>;
}

type Tabs = "Basic Information" | "Roles & Permissions" | "Permissions";

const UserForm = ({
  isOpen,
  onClose,
  staffDetails,
  refreshData,
}: UserFormProps) => {
  const { updatingData, error, updateStaffDetails } = useStaffStore();
  const createUser = useUserAccountStore((state) => state.createUser);
  const editUser = useUserAccountStore((state) => state.editUser);
  const [isUserCreated, setIsUserCreated] = useState(false); // boolean to check if the user is created
  const tabs: Tabs[] = ["Roles & Permissions", "Basic Information"];
  const [activeTab, setActiveTab] = useState<Tabs>("Roles & Permissions");

  // set the isUserCreated state to true if the user is created
  useEffect(() => {
    setIsUserCreated(staffDetails.permissions ? true : false);
  }, [staffDetails.permissions]);

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
      await refreshData();
      toast.success("Staff data updated");
      onClose();
    } else {
      toast.error(useStaffStore.getState().error);
    }
  };

  const handleRoleSubmit = async (roleId: number) => {
    const roleData = {
      email: staffDetails.staff.email!,
      roleId: roleId,
    };
    console.log(roleId);
    console.log(roleData);
    if (staffDetails?.staff.id) {
      isUserCreated
        ? await editUser(roleData, staffDetails.staff.user!.id)
        : await createUser(roleData, staffDetails.staff.id);
    } else {
      alert("cannot find staff id to fetch data");
    }
    if (!useUserAccountStore.getState().error) {
      console.log(error, updatingData);
      // onClose();
      isUserCreated
        ? toast.success("User permissions edited")
        : toast.success("User has been created successfully");
      await refreshData();

      // onClose();
    } else {
      toast.error(useUserAccountStore.getState().error);
    }
  };

  return (
    <div className="overflow-auto">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        width="w-[90vw] md:w-[700px] lg:w-[750px] "
      >
        <div className="w-full">
          <h2 className="mb-5 text-center text-2xl font-bold">Staff Account</h2>

          <div className="mb-8">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab as Tabs);
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

          {/* {activeTab === "Permissions" && (
            <div>
              <UserPermissions
                userPermissions={staffDetails.permissions}
                onPermissionsSubmit={handlePermissionsSubmit}
              />
            </div>
          )} */}

          {activeTab === "Roles & Permissions" && (
            <div>
              <UserRoles
                userPermissions={staffDetails.permissions as Permission[]}
                onPermissionsSubmit={handleRoleSubmit}
                role={staffDetails.role}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;
