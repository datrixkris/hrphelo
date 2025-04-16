import Modal from "@/app/components/Modal";
import React, { useEffect, useState } from "react";
import AddMembersField from "../../AddMembersField";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import Button from "@/app/components/Button";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { Member } from "../../../types/project-types";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
// import { StaffData } from "@/app/(client)/(dashboard)/staff/types";

const EditMembersForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { projectDetails: project } = useProjectDetailsContext()!;
  const [memberIds, setMemberIds] = useState<(number | undefined)[]>([]);
  const [memberError] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>();
  const staff = useStaffStore((state) => state.staffs);

  useEffect(() => {
    setSelectedMembers(project?.members);
  }, [project]);

  useEffect(() => {
    const chosen = staff
      .filter((item) => {
        if (memberIds.includes(item.id)) {
          return item;
        }
      })
      .map((item) => {
        return {
          id: item.id,
          projectId: project?.id ?? 0,
          staffId: item.staffId ?? 0,
          staff: {
            id: item.id,
            name: item.name,
            image: item.image,
          },
        };
      });
    console.log(chosen);
    setSelectedMembers(chosen);
  }, [memberIds]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[500px] lg:w-[500px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Team Members</h2>

          {/* add members search text */}
          <div className="my-5">
            <AddMembersField
              getIds={(ids) => setMemberIds(ids)}
              showAvatars={false}
              multiple={true}
              selectedIds={project?.members?.map((item) => item.staff.id)}
            />
            <span className="label-text text-error">{memberError}</span>
          </div>

          {/* members */}
          <p className="mb-2">Team members</p>

          <div className="">
            {/* member */}
            {selectedMembers?.map((member) => {
              return (
                <div key={member.id}>
                  <div className="flex items-center gap-5 px-1 py-2 hover:bg-neutral-100">
                    {/* image */}
                    <div className="avatar shrink-0">
                      <div className="w-14 rounded-full">
                        <img src={member.staff.image} alt={member.staff.name} />
                      </div>
                    </div>

                    {/* details */}
                    <div className="">
                      <p className="mb-1 text-base font-semibold">
                        {member.staff.name}
                      </p>
                      <p className="text-xs">Web developer</p>
                    </div>

                    {/* remove button */}
                    {/* <div className="ml-auto w-fit">
                      <div
                        className="tooltip hover:cursor-pointer"
                        data-tip="Remove"
                      >
                        <Icon
                          icon="heroicons:minus-16-solid"
                          className="text-2xl"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>

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

export default EditMembersForm;
