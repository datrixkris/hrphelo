import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";

interface Data {
  name: string;
  id: number;
  selected: boolean;
}

interface SearchAndResultsInputComponentProps {
  data: Data[];
  onSelected: (data: Data) => void;
  fetchData?: () => Promise<void>;
  loading?: boolean;
}

const SearchAndResultsInputComponent = ({
  data,
  onSelected,
  fetchData,
  loading,
}: SearchAndResultsInputComponentProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [newData, setNewData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  // Detects clicks outside of the dropdown
  // Detects clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setNewData(data);
    if (searchTerm) {
      searchByName(searchTerm);
    }
  }, [data]);

  function selectItem(item: Data) {
    const data = { ...item, selected: !item.selected };

    onSelected(data);
    // console.log(data);
  }

  function handleDropdownClick() {
    setShowDropdown(true);
    if (fetchData) {
      fetchData();
    }
  }

  const searchByName = (str: string) => {
    setShowDropdown(true);
    setSearchTerm(str);
    if (str === "") {
      // If search term is empty, reset to initial data
      setNewData(data);
    } else {
      setNewData(
        data.filter((item) =>
          item.name.toLowerCase().includes(str.toLowerCase()),
        ),
      );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search by name"
          onChange={(e) => searchByName(e.target.value)}
        />
        <Icon
          icon="heroicons:chevron-down"
          className="cursor-pointer"
          onClick={handleDropdownClick}
        />
      </label>

      {/* dropdown to show content */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-[120%] z-40 max-h-[200px] overflow-y-auto rounded-md border bg-base-100 p-2 text-sm shadow">
          {loading ? (
            <p className="p-2 text-center text-neutral-400">
              <Icon icon="eos-icons:loading" className="m-auto text-2xl" />
            </p>
          ) : newData.length < 1 && !loading ? (
            <p className="p-2 text-center text-neutral-400">
              No data available
            </p>
          ) : (
            <ul className="space-y-1">
              {newData.map((item) => {
                return (
                  <li
                    onClick={() => selectItem(item)}
                    className={`flex cursor-pointer items-center justify-between p-2 hover:bg-base-200 ${item.selected && "bg-success hover:bg-success"}`}
                    key={item.id}
                  >
                    {item.name}
                    {item.selected && (
                      <Icon icon="heroicons:check" className="text-xl" />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndResultsInputComponent;
