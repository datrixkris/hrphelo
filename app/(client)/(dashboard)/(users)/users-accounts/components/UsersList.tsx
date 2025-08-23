"use client";

import React, { useEffect, useState } from "react";
import TableSkeleton from "@/app/components/TableSkeleton";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import UsersTable from "./UsersTable";
import { StaffData } from "@/app/(client)/(dashboard)/(employee)/staff/types";
import UserForm from "./UserForm";
import { useUserAccountStore } from "../user-account-store";
import { Permissions, Role } from "../types";

export interface UsersInterface {
  staff: StaffData;
  permissions: Permissions[] | null;
  role: Role | null;
}

const UsersList = () => {
  const { fetchStaff } = useStaffStore();
  const { fetchUsers } = useUserAccountStore();
  const [userFormData, setUserFormData] = useState<UsersInterface | null>(null); // this is the data of the user that will be displayed in the user form
  const [openModal, setOpenModal] = useState(false); // this is the state of the user form modal
  const [loading, setLoading] = useState(false); // this is the loading state of the users list
  const [usersList, setUsersList] = useState<UsersInterface[]>([]); // this is the list of users that will be displayed in the table

  // initialize the users list
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
        // if staff has an account in the useraccounts data, get the permissions of the user
        const userCreatedData = useUserAccountStore
          .getState()
          .userAccounts.find((user) => user.staff.id === staff.id);

        return userCreatedData
          ? {
              staff,
              permissions: userCreatedData.role.permissions,
              role: userCreatedData.role,
            }
          : { staff, permissions: null, role: null };
      });
      setUsersList(usersData);
      setLoading(false);
    };

    fetchData();
  }, [fetchStaff, fetchUsers]);

  const refreshData = async () => {
    await fetchStaff(); //fetch staff data... this is all staff, account bearing or not
    await fetchUsers(false); //fetch user data... this is staff that have accounts
    const usersData = useStaffStore.getState().staffs.map((staff) => {
      // check if staff has an account in the useraccounts data
      const userCreatedData = useUserAccountStore
        .getState()
        .userAccounts.find((user) => user.staff.id === staff.id);

      return userCreatedData
        ? {
            staff,
            permissions: userCreatedData.role.permissions,
            role: userCreatedData.role,
          }
        : { staff, permissions: null, role: null };
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

      {/* User Form... Show only if */}
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
