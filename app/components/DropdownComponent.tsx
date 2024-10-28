import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface DropdownContent {
  icon?: string;
  item: string;
  onClick?: (item?: string) => void;
}

interface DropdownProps {
  positionEnd?: boolean;
  dropdownContent: DropdownContent[];
  children: React.ReactNode;
}

const DropdownComponent = ({
  positionEnd = true,
  dropdownContent,
  children,
}: DropdownProps) => {
  return (
    <div className={`dropdown ${positionEnd ? "dropdown-end" : ""}`}>
      <div tabIndex={0} role="button" className="">
        {children}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {dropdownContent.map((content, index) => {
          return (
            <li key={index}>
              <a
                className="capitalize"
                onClick={() => content.onClick?.(content.item)}
              >
                {content.icon && <Icon icon={content.icon} />} {content.item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownComponent;
