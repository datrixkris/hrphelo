import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export const DepartmertTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-base-100">
        <thead>
          <tr className="dark:text-white">
            <th></th>
            <th>Department Name</th>
            <th>Head of Dep.</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Employee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <th>1</th>
            <td>iOS Application Development</td>
            <td>Jonas Frederiksen</td>
            <td>61 53 62 05</td>
            <td>HollyKavanaugh@tailwick.com</td>
            <td>15</td>
            <td>
              <div className="flex items-center gap-1">
                <button className="group flex rounded-full p-2 transition-all duration-500">
                  <Icon
                    icon="mage:edit"
                    className="h-6 w-6 cursor-pointer text-blue-500"
                  />
                </button>
                <button className="group flex rounded-full p-2 transition-all duration-500">
                  <Icon
                    icon="weui:delete-outlined"
                    className="h-6 w-6 cursor-pointer text-red-500"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
