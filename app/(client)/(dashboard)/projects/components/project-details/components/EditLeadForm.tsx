import Modal from "@/app/components/Modal";
import React, { useEffect, useState } from "react";
import AddMembersField from "../../AddMembersField";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import Button from "@/app/components/Button";
import { useStaffStore } from "@/app/(client)/(dashboard)/staff/staff-store";
import { StaffData } from "@/app/(client)/(dashboard)/staff/types";

const EditLeadForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { projectDetails: project } = useProjectDetailsContext()!;
  const [leaderId, setLeaderId] = useState<number | undefined>();
  const [replacement, setReplacement] = useState<StaffData>();
  const staff = useStaffStore((state) => state.staffs);

  useEffect(() => {
    setReplacement(staff.find((item) => item.id === leaderId));
    console.log(leaderId);
  }, [leaderId]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[500px] lg:w-[500px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Team Lead</h2>

          {/* add members search text */}
          <div className="my-5">
            <AddMembersField
              getIds={(ids) => setLeaderId(ids[0])}
              showAvatars={false}
            />
          </div>

          <div className="mb-5">
            {/* Current lead */}
            <p className="mb-2">Current Lead</p>
            {/* members */}
            <div className="space-y-2">
              {/* member */}
              <div className="flex items-center gap-5 px-1 py-2 hover:bg-neutral-100">
                {/* image */}
                <div className="avatar shrink-0">
                  <div className="w-14 rounded-full">
                    <img
                      src={project?.project_lead?.image}
                      alt={project?.project_lead?.name}
                    />
                  </div>
                </div>

                {/* details */}
                <div className="">
                  <p className="mb-1 text-base font-semibold">
                    {project?.project_lead?.name}
                  </p>
                  <p className="text-xs">Team Leader</p>
                </div>
              </div>
            </div>
          </div>

          {leaderId && (
            <div className="">
              {/*replacement lead*/}
              <p className="mb-2">Replacement </p>

              {/* members */}
              <div className="space-y-2">
                {/* member */}
                <div className="flex items-center gap-5 px-1 py-2 hover:bg-neutral-100">
                  {/* image */}
                  <div className="avatar shrink-0">
                    <div className="w-14 rounded-full">
                      <img src={replacement?.image} alt={replacement?.name} />
                    </div>
                  </div>

                  {/* details */}
                  <div className="">
                    <p className="mb-1 text-base font-semibold">
                      {replacement?.name}
                    </p>
                    <p className="text-xs">Team Leader</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* submit */}
          <div className="mt-3 flex justify-center">
            <Button>
              <p className="text-base">Submit</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditLeadForm;
