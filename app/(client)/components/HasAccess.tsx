"use client";

import { useHasPermission } from "@/app/hooks/permissions";
import {
  ModuleName,
  PermissionType,
} from "@/app/(client)/(dashboard)/(users)/roles-permissions/types";
import React from "react";

interface HasAccessProps {
  module: ModuleName;
  permission?: PermissionType;
  children: React.ReactNode;
}

const HasAccess = ({
  module,
  permission = "read",
  children,
}: HasAccessProps) => {
  const hasAccess = useHasPermission(permission, module);

  if (!hasAccess) {
    return (
      <div className="p-4">
        <h1 className="text-center text-lg font-semibold">
          You do not have permission to access this page
        </h1>
        <p className="text-center text-sm">
          Please contact your administrator for more information.
        </p>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default HasAccess;
