"use client";

import React, { useEffect } from "react";
import RolesTable from "./RolesTable";
import { useRolesStore } from "../roles-store";
import TableSkeleton from "@/app/components/TableSkeleton";

const RoleList = () => {
  const { roles, loading, fetchRoles } = useRolesStore();

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div>
      {roles.length < 1 && loading ? (
        <TableSkeleton />
      ) : roles.length > 0 ? (
        <RolesTable roles={roles} />
      ) : (
        <div className="rounded py-20 text-center">No data available</div>
      )}
    </div>
  );
};

export default RoleList;
