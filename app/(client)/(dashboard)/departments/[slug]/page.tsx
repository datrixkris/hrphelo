// import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <div className="mb-[1.875rem]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-[1.2] sm:mb-[5px] sm:text-2xl md:text-[26px]">
              Department
            </h3>
            <ul className="hidden flex-wrap text-[14px] font-medium sm:flex md:text-base">
              <li>
                <a href="" className="text-[#333333]">
                  Dashboard
                </a>
              </li>
              <li>
                <span className="px-2 dark:text-[#6c757d]">/</span>
              </li>
              <li className="text-[#6c757d]">Departments</li>
            </ul>
          </div>
          <div>{/* <Button>Add Department </Button> */}</div>
        </div>
      </div>
      <div className="w-full border bg-base-100 p-10">
        <h3 className="text-xl font-semibold">Department Name</h3>
        <p className="text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam vel
          fugit reprehenderit! Accusantium explicabo debitis, quidem nemo cum,
          nihil tempore velit aut facere sed voluptate rem porro assumenda unde
          suscipit?
        </p>
        <div className="space-x-5 py-4 md:flex">
          <div>
            {" "}
            <span className="font-bold">Head of Dep:</span> Thomas Hatfield
          </div>
          <div>
            {" "}
            <span className="font-bold">Phone Number:</span>0911 47 65 49{" "}
          </div>
          <div>
            <span className="font-bold">Email:</span>
            HollyKavanaugh@tailwick.com{" "}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Employee ID </th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Join Date</th>
                <th>Role</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <td>FT-0007 </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>bernardogalaviz@example.com</td>
                <td>9876543210</td>
                <td>1 Jan 2013</td>
                <td>
                  {" "}
                  <span className="rounded-full bg-green-300 p-2 text-green-800">
                    Web Designer
                  </span>
                </td>
                <th>
                  <button>
                    <Icon icon="mdi:eye" className="h-6 w-6" />
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
