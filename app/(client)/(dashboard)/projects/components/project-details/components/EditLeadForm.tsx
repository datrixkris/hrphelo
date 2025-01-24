import Modal from "@/app/components/Modal";
import React, { useEffect, useState } from "react";
import AddMembersField from "../../AddMembersField";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import Button from "@/app/components/Button";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import { StaffData } from "@/app/(client)/(dashboard)/(employee)/staff/types";
import { useProjectStore } from "../../../stores/project-store";
import { toast } from "react-toastify";

const EditLeadForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { projectDetails: project, refreshData } = useProjectDetailsContext()!;
  const [leaderId, setLeaderId] = useState<number | undefined>();
  const [replacement, setReplacement] = useState<StaffData>();
  const staff = useStaffStore((state) => state.staffs);
  const updateProjectDetails = useProjectStore(
    (state) => state.updateProjectDetails,
  );
  const updatingData = useProjectStore((state) => state.updatingData);

  useEffect(() => {
    setReplacement(staff.find((item) => item.id === leaderId));
    console.log(leaderId);
  }, [leaderId]);

  const assignLead = async () => {
    console.log("shitttt");
    if (project) {
      const projectData = {
        leaderId: leaderId,
        name: project.name,
        description: project.description,
      };

      if (project?.id) {
        await updateProjectDetails(projectData, project.id);

        if (!useProjectStore.getState().error) {
          toast.success("Project added successfully!");
          refreshData();
          onClose();
        } else {
          toast.error(
            `Failed to add project: ${useProjectStore.getState().error}`,
          );
        }
      } else {
        console.log("no project slug that's why");
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        width={"w-[90vw] sm:w-[500px] lg:w-[500px]"}
      >
        <div className="w-full">
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
            <Button onClick={assignLead} disabled={updatingData}>
              <p className="text-base">
                {updatingData ? "Submitting..." : "Submit"}
              </p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditLeadForm;
