import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type Props = {};

const StaffProfile = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
        {/* personal informations */}

        <div className="rounded-lx bg-base-100 px-5 py-5">
          <div className="flex justify-between py-3">
            <p className="text-2xl">Personal informations</p>
            <div className="rounded-full  cursor-pointer border bg-primary p-2 text-white">
              <Icon icon="mdi:pencil-outline" />
            </div>
          </div>
          <div className="md:py-0">
            <table className="w-full text-[15px]">
              <tbody className="">
             
                <tr className="">
                  <td className="py-2 pr-3 font-semibold lg:w-2/6">
                    Identification Number
                  </td>
                  <td className="text-neutral-400">erlkgnlk</td>
                </tr>
           
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    Phone Number
                  </td>
                  <td className="text-neutral-400">erlkrelker</td>
                </tr>
          
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    Nationality
                  </td>
                  <td className="text-neutral-400">"MMM D, YYYY",</td>
                </tr>
        
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">Religion:</td>
                  <td className="text-neutral-400"> N/A </td>
                </tr>
       
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    Marital status :
                  </td>
                  <td className="text-neutral-400">erkgreg</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    No. of children :
                  </td>
                  <td className="text-neutral-400">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Emergency Contact */}
        <div className="rounded-lx bg-base-100 px-5 py-5">
          <div className="flex justify-between py-3">
            <p className="text-2xl">Emergency Contact</p>
            <div className="rounded-full border bg-primary p-2 text-white">
              <Icon icon="mdi:pencil-outline" />
            </div>
          </div>
          <div className="md:py-0">
            <table className="w-full text-[15px]">
              <h4 className="font-bold">Secondary</h4>

              <tbody className="">
        
                <tr className="">
                  <td className="py-2 pr-3 font-semibold lg:w-2/6">Name</td>
                  <td className="text-neutral-400">erlkgnlk</td>
                </tr>
          
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    Relationship
                  </td>
                  <td className="text-neutral-400">erlkrelker</td>
                </tr>
            
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">Phone</td>
                  <td className="text-neutral-400">"MMM D, YYYY",</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <h4 className="mt-4 font-bold">Secondary</h4>
            <table className="w-full text-[15px]">
              <tbody className="">
          
                <tr className="">
                  <td className="py-2 pr-3 font-semibold lg:w-2/6">Name</td>
                  <td className="text-neutral-400">erlkgnlk</td>
                </tr>
       
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    Relationship
                  </td>
                  <td className="text-neutral-400">erlkrelker</td>
                </tr>
            
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">Phone</td>
                  <td className="text-neutral-400">"MMM D, YYYY",</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Bank information   */}
        <div className="rounded-lx bg-base-100 px-5 py-5">
          <div className="flex justify-between py-3">
            <p className="text-2xl">Bank information</p>
            <div className="rounded-full border bg-primary p-2 text-white">
              <Icon icon="mdi:pencil-outline" />
            </div>
          </div>
          <div className="md:py-0">
            <table className="w-full text-[15px]">
              <tbody className="">
                {/* phone */}
                <tr className="">
                  <td className="py-2 pr-3 font-semibold lg:w-2/6">
                    Bank name
                  </td>
                  <td className="text-neutral-400">ICICI Bank</td>
                </tr>
                {/* Email */}
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">
                    Bank account No.
                  </td>
                  <td className="text-neutral-400">159843014641</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
