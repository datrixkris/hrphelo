import React from "react";
import { Icon } from "@iconify/react";

const StaffDetailsCard = () => {
  return (
    <div className="relative flex rounded border border-base-300 bg-base-100 p-5">
      <div className="w-[45%] border-r border-dashed border-base-300">
        {/* image and staff details */}
        <div className="flex gap-4">
          {/* image */}
          <div className="avatar">
            <div className="w-36 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          {/* staff Details */}
          <div className="">
            <p className="text-2xl font-bold">Jane Doe</p>
            <p className="cursor-pointer text-hr-yellow transition-colors hover:text-hr-yellow-dark">
              Marketing Department
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Lead Marketing Researcher
            </p>

            <p className="mt-4 font-semibold">Staff ID: S0001 </p>
            <p className="text-sm text-neutral-400">
              Date Joined: 25th April, 2018
            </p>
          </div>
        </div>
      </div>

      <div className="w-[55%] px-5">
        <table className="text-[15px]">
          {/* phone */}
          <tr>
            <td className="w-40 py-2 pr-3 font-semibold">Phone:</td>
            <td className="text-neutral-400">0247838329</td>
          </tr>
          {/* Email */}
          <tr>
            <td className="w-40 py-2 pr-3 font-semibold">Email:</td>
            <td className="text-neutral-400">janedoe@hrphello.com</td>
          </tr>
          {/* Birthday */}
          <tr>
            <td className="w-40 py-2 pr-3 font-semibold">Birthday:</td>
            <td className="text-neutral-400">5th June, 1990</td>
          </tr>
          {/* Address */}
          <tr>
            <td className="w-40 py-2 pr-3 font-semibold">Address:</td>
            <td className="text-neutral-400">Alajo ST. Alabama wisconsin</td>
          </tr>
          {/* Gender */}
          <tr>
            <td className="w-40 py-2 pr-3 font-semibold">Gender:</td>
            <td className="text-neutral-400">Female</td>
          </tr>
          {/* Supervisor */}
          <tr>
            <td className="w-40 py-2 pr-3 font-semibold">Supervisor:</td>
            <td className="cursor-pointer text-hr-yellow transition-colors hover:text-hr-yellow-dark">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <span>Mr. Akoto Amoah</span>
              </div>
            </td>
          </tr>
        </table>
      </div>

      {/* edit button */}
      <div className="absolute right-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-hr-yellow text-black transition-colors hover:bg-hr-yellow-dark">
        <Icon icon="heroicons:pencil" className="text-xl" />
      </div>
    </div>
  );
};

export default StaffDetailsCard;
