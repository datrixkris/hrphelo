"use client";

import React, { use, useEffect, useState } from "react";
import TableSkeleton from "@/app/components/TableSkeleton";
import { useStaffStore } from "../../staff/staff-store";
import UsersTable from "./UsersTable";
import { StaffData, StaffDetail } from "../../staff/types";
import UserForm from "./UserForm";
import { useUserAccountStore } from "../user-account-store";
import { Permissions, UserData } from "../types";

export interface UsersInterface {
  staff: StaffData;
  permissions: Permissions[] | null;
}

const UsersList = () => {
  const { fetchStaff } = useStaffStore();
  const { fetchUsers } = useUserAccountStore();
  const [userFormData, setUserFormData] = useState<UsersInterface | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchStaff();
      await fetchUsers();
      const usersData = useStaffStore.getState().staffs.map((staff) => {
        // check if staff has an account in the useraccounts data
        const userCreatedData = useUserAccountStore
          .getState()
          .userAccounts.find((user) => user.staff.id === staff.id);

        return userCreatedData
          ? { staff, permissions: userCreatedData.permissions }
          : { staff, permissions: null };
      });
      setUsers(usersData);
      setLoading(false);
    };

    fetchData();
  }, [fetchStaff, fetchUsers]);

  const getUserFormData = (data: UsersInterface) => {
    setOpenModal(true);
    setUserFormData(data);
  };
  const clearUserFormData = () => {
    setOpenModal(false);
    setUserFormData(null);
  };

  return (
    <div>
      <div className="">
        {users.length < 1 && loading ? (
          <div className="rounded text-center">
            <TableSkeleton />
          </div>
        ) : users.length > 0 ? (
          <UsersTable
            staff={users}
            setUserFormData={(data) => getUserFormData(data)}
          />
        ) : (
          <div className="rounded py-20 text-center">No data available</div>
        )}
      </div>

      {userFormData && (
        <UserForm
          isOpen={openModal}
          onClose={() => clearUserFormData()}
          staffDetails={userFormData}
        />
      )}
    </div>
  );
};

export default UsersList;
