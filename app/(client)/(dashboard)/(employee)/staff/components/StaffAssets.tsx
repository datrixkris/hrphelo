import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";


const StaffAssets = () => {
  return (
    <div>
      <div className="overflow-x-auto py-5">
        <table className="table table-lg w-full rounded border border-base-300 bg-base-100">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Asset ID</th>
              <th>Assigned Date</th>
              <th>Assignee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Laptop</div>
                  </div>
                </div>
              </td>
              <td>AST - 003</td>
              <td>22 Nov, 2022</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">
                      harthagerty@sdjf.com
                    </div>
                  </div>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">
                  <Icon icon="mdi:eye-outline" className="text-xl" />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffAssets;
