import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useStaffStore } from "../(client)/(dashboard)/staff/staff-store";
import { StaffData } from "../(client)/(dashboard)/staff/types";

// interface Staff {
//   id: string;
//   name: string;
//   image: string;
// }

interface SelectorStaffProps {
  onSelect: (selectedStaff: StaffData[]) => void;
}

export const SelectorStaff = ({ onSelect }: SelectorStaffProps) => {
  const { fetchStaff, staffs } = useStaffStore();
  const [inputValue, setInputValue] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffData[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleSelect = (staff: StaffData) => {
    const isSelected = selectedStaff.find((s) => s.id === staff.id);
    let updatedSelectedStaff: StaffData[];

    if (isSelected) {
      updatedSelectedStaff = selectedStaff.filter((s) => s.id !== staff.id);
    } else {
      updatedSelectedStaff = [...selectedStaff, staff];
    }

    setSelectedStaff(updatedSelectedStaff);
    onSelect(updatedSelectedStaff);
    setInputValue("");
    setOpen(false);
  };

  return (
    <div className="relative my-4 w-full font-medium">
      <div className="flex w-full items-center">
        <label className="relative w-full">
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 p-2 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search staff"
            onFocus={() => setOpen(true)}
          />
          <Icon
            icon="material-symbols-light:search"
            className="absolute left-3 top-3 text-gray-400"
          />
        </label>
      </div>

      <ul
        className={`absolute z-50 mt-1 w-full rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out ${
          open && inputValue
            ? "max-h-60 overflow-y-auto"
            : "max-h-0 overflow-hidden"
        }`}
      >
        {staffs?.length ? (
          staffs
            .filter((staff) => staff.name.toLowerCase().startsWith(inputValue))
            .map((staff) => (
              <li
                key={staff.id}
                className={`z-30 cursor-pointer p-3 text-sm transition-colors duration-150 hover:bg-primary hover:text-white ${
                  selectedStaff.find((s) => s.id === staff.id)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleSelect(staff)}
              >
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="mr-2 inline-block h-6 w-6 rounded-full"
                />
                {staff.name}
                {/* Check mark for selected items */}
                {selectedStaff.find((s) => s.id === staff.id) && (
                  <Icon icon="material-symbols:check" className="text-white" />
                )}
              </li>
            ))
        ) : (
          <li className="p-3 text-sm text-gray-500">No staff available</li>
        )}
      </ul>
    </div>
  );
};
