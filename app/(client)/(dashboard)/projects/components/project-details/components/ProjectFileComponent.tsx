import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DropdownComponent from "@/app/components/DropdownComponent";

const ProjectFileComponent = () => {
  return (
    <div className="group flex items-start gap-2 border-b py-3">
      {/* image icon tin */}
      <div className="size-14 shrink-0 rounded border bg-neutral-100">
        <Icon icon="hugeicons:pdf-02" className="mx-auto p-1 text-5xl" />
      </div>

      {/* file details tin */}
      <div className="space-y-1">
        <p className="text-base font-semibold text-hr-yellow">
          AHA Selfcare Mobile Application Test-Cases.xls
        </p>
        <p className="">
          <span className="text-xs text-hr-yellow underline">John Doe</span>{" "}
          <span>May 31st at 3:15am</span>
        </p>
        <p className="text-base">Size: 20Mb</p>
      </div>

      {/* overflow with dropdown */}
      <div className="invisible ml-auto shrink-0 group-hover:visible">
        <DropdownComponent
          dropdownContent={[
            {
              item: "share",
              onClick: () => alert("som"),
              icon: "material-symbols:share",
            },
            { item: "delete" },
          ]}
        >
          <Icon icon="lucide:ellipsis" className="text-2xl"></Icon>
        </DropdownComponent>
      </div>
    </div>
  );
};

export default ProjectFileComponent;
