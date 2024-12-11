"use client";

import React, { use, useEffect, useState } from "react";
import TableSkeleton from "@/app/components/TableSkeleton";
import { useStaffStore } from "../../staff/staff-store";
import UsersTable from "./UsersTable";
import { StaffData } from "../../staff/types";
import UserForm from "./UserForm";

const UsersList = () => {
  const { staffs, loading, fetchStaff } = useStaffStore();
  const [userData, setUserData] = useState<StaffData | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const getUserData = (data: StaffData) => {
    setOpenModal(true);
    setUserData(data);
  };
  const clearUserData = () => {
    setOpenModal(false);
    setUserData(null);
  };

  return (
    <div>
      <div className="">
        {staffs.length < 1 && loading ? (
          <div className="rounded text-center">
            <TableSkeleton />
          </div>
        ) : staffs.length > 0 ? (
          <UsersTable
            staff={staffs}
            setUserData={(data) => getUserData(data)}
          />
        ) : (
          <div className="rounded py-20 text-center">No data available</div>
        )}
      </div>

      {userData && (
        <UserForm
          isOpen={openModal}
          onClose={() => clearUserData()}
          staffDetails={userData}
        />
      )}
    </div>
  );
};

export default UsersList;
