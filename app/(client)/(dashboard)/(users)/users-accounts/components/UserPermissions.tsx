import React, { useState } from "react";
import Button from "@/app/components/Button";
import { Permissions, UserModules } from "../types";
// import PermissionsComponent from "./Permissions";
import { useUserAccountStore } from "../user-account-store";

const UserPermissions = ({
  onPermissionsSubmit,
  userPermissions,
}: {
  onPermissionsSubmit: (permissions: UserModules[]) => void;
  userPermissions: Permissions[] | null;
}) => {
  const [permissions, setPermissions] = useState<UserModules[] | null>(null);
  const updatingData = useUserAccountStore((state) => state.updatingData);

  const handleSubmit = () => {
    // send data to parent component
    if (permissions) {
      onPermissionsSubmit(permissions);
    }
  };

  // get permissions module data from the permissions component anytime a user checks a permission box
  // const getUserPermissions = (data: UserModules[]) => {
  //   console.log(data);
  //   setPermissions(data);
  // };

  return (
    <div>
      {/* <PermissionsComponent
        userPermissions={userPermissions}
        getUserPermissions={getUserPermissions}
      /> */}

      <div className="!mt-10">
        {userPermissions ? (
          <Button
            className="mx-auto w-1/2"
            disabled={updatingData}
            onClick={() => handleSubmit()}
          >
            {updatingData ? "Editing permissions..." : "Edit permissions"}
          </Button>
        ) : (
          <Button
            onClick={() => handleSubmit()}
            className="mx-auto w-1/2"
            disabled={updatingData}
          >
            {updatingData ? "Creating user..." : "Create user"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserPermissions;
