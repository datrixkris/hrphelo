"use client";

import React, { useEffect, useState } from "react";
import TableSkeleton from "@/app/components/TableSkeleton";
import { useStaffStore } from "../../staff/staff-store";
import UsersTable from "./UsersTable";
import { StaffData } from "../../staff/types";
import UserForm from "./UserForm";
import { useUserAccountStore } from "../user-account-store";
import { Permissions } from "../types";

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
  const [usersList, setUsersList] = useState<UsersInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // check if staff data exist... if not fetch
      if (useStaffStore.getState().staffs.length < 1) {
        await fetchStaff(); //fetch staff data... this is all staff, account bearing or not
      }
      // check if users data exist... if not fetch
      if (useUserAccountStore.getState().userAccounts.length < 1) {
        await fetchUsers(); //fetch user data... this is staff that have accounts
      }

      const usersData = useStaffStore.getState().staffs.map((staff) => {
        // check if staff has an account in the useraccounts data
        const userCreatedData = useUserAccountStore
          .getState()
          .userAccounts.find((user) => user.staff.id === staff.id);

        return userCreatedData
          ? { staff, permissions: userCreatedData.permissions }
          : { staff, permissions: null };
      });
      setUsersList(usersData);
      setLoading(false);
    };

    fetchData();
  }, [fetchStaff, fetchUsers]);

  const refreshData = async () => {
    await fetchStaff(); //fetch staff data... this is all staff, account bearing or not
    await fetchUsers(); //fetch user data... this is staff that have accounts
    const usersData = useStaffStore.getState().staffs.map((staff) => {
      // check if staff has an account in the useraccounts data
      const userCreatedData = useUserAccountStore
        .getState()
        .userAccounts.find((user) => user.staff.id === staff.id);

      return userCreatedData
        ? { staff, permissions: userCreatedData.permissions }
        : { staff, permissions: null };
    });
    setUsersList(usersData);
  };

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
        {usersList.length < 1 && loading ? (
          <div className="rounded text-center">
            <TableSkeleton />
          </div>
        ) : usersList.length > 0 ? (
          <UsersTable
            staff={usersList}
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
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default UsersList;
