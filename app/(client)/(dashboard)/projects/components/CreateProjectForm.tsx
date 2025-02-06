import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectData } from "../types/project-types";
import { useProjectStore } from "../stores/project-store";
import { toast } from "react-toastify";
import AddMembersField from "./AddMembersField";
import SearchAndResultsInputComponent from "@/app/components/SearchAndResultsInputComponent";
import { useStaffStore } from "../../(employee)/staff/staff-store";
import { Data as PotentialMembersType } from "@/app/components/SearchAndResultsInputComponent";
import { set } from "date-fns";

const CreateProjectForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<ProjectData>();
  const { createProject, updatingData, fetchProjects } = useProjectStore();
  const [memberIds, setMemberIds] = useState<number[]>([]);
  const [leaderId, setLeaderId] = useState<number>();
  const [leaderError, setLeaderError] = useState("");
  const [memberError, setMemberError] = useState("");
  const { staffs, fetchStaff, loading: staffLoading } = useStaffStore();
  const [potentialMembers, setPotentialMembers] = useState<
    PotentialMembersType[]
  >([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      await fetchStaff();
      setPotentialMembers(
        useStaffStore.getState().staffs.map((staff) => ({
          id: staff.id,
          name: staff.name,
          selected: false,
        })),
      );
    };
    fetchStaffData();
  }, [fetchStaff]);

  function selectMember(data: PotentialMembersType) {
    console.log(data);
    setPotentialMembers((prevData) =>
      prevData.map((item) => (item.id === data.id ? data : item)),
    );
    // console.log(potentialMembers);
  }

  const onSubmit: SubmitHandler<ProjectData> = async (data) => {
    if (leaderId == undefined) {
      setLeaderError("Select project lead");
      return;
    } else {
      setLeaderError("");
    }
    if (memberIds == undefined || memberIds.length == 0) {
      setMemberError("Select at least one team member");
      return;
    } else {
      setMemberError("");
    }

    const projectData = {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      due_date: data.end_date,
      priority: data.priority,
      leaderId,
      memberIds,
    };

    console.log(projectData);

    await createProject(projectData);

    if (!useProjectStore.getState().error) {
      toast.success("Project added successfully!");
      fetchProjects();
      reset();
      onClose();
    } else {
      toast.error(`Failed to add project: ${useProjectStore.getState().error}`);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full">
          {/* title */}
          <h2 className="mb-5 text-center text-2xl font-bold">
            Create project
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              {/* project name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Project Name <span className="text-error">*</span>
                  </span>
                </div>
                <input
                  required
                  {...register("name")}
                  type="text"
                  placeholder="Enter project name"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Start date */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Start date <span className="text-error">*</span>
                  </span>
                </div>
                <input
                  type="date"
                  required
                  {...register("start_date")}
                  className="input input-bordered w-full"
                />
              </label>

              {/* End date */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">End date</span>
                </div>
                <input
                  type="date"
                  {...register("end_date")}
                  className="input input-bordered w-full"
                />
              </label>

              {/* Priority */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Priority <span className="text-error">*</span>
                  </span>
                </div>
                <select
                  defaultValue=""
                  required
                  className="select select-bordered w-full"
                  {...register("priority")}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>

              {/* Project Leader */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select project lead</span>
                </div>
                <AddMembersField
                  getIds={(ids) => setLeaderId(ids[0])}
                  excludedIds={memberIds ? memberIds : []}
                />
                {leaderError && (
                  <span className="label-text text-error">{leaderError}</span>
                )}
              </label>

              {/* Team Members */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select team members</span>
                </div>
                <AddMembersField
                  getIds={(ids) => setMemberIds(ids)}
                  multiple={true}
                  excludedIds={leaderId ? [leaderId] : []}
                />
                <span className="label-text text-error">{memberError}</span>
              </label>
            </div>

            <div className="">
              <SearchAndResultsInputComponent
                data={potentialMembers}
                onSelected={(selected) => selectMember(selected)}
                loading={staffLoading}
              />
            </div>

            {/* Description */}
            <div className="mt-5">
              <label htmlFor="" className="label-text">
                Description <span className="text-error">*</span>
              </label>
              <textarea
                required
                {...register("description")}
                rows={5}
                className="textarea textarea-bordered mt-1 w-full"
                placeholder="Detailed project description here"
              ></textarea>
            </div>

            {/* Upload files */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Upload files</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </label>

            {/* submit */}
            <div className="!mt-10">
              <Button className="mx-auto w-1/2" disabled={updatingData}>
                {updatingData ? "Creating project..." : "Create project"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProjectForm;
