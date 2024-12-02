import React, { useEffect } from "react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectData } from "../../../types/project-types";
import { useProjectStore } from "../../../stores/project-store";
import { toast } from "react-toastify";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import dayjs from "dayjs";

const EditProjectDetails = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { projectDetails: project, refreshData } = useProjectDetailsContext()!;
  const { register, handleSubmit, reset } = useForm<ProjectData>();
  const { updatingData } = useProjectStore();
  const updateProjectDetails = useProjectStore(
    (state) => state.updateProjectDetails,
  );
  //   const error = useProjectStore.getState().error;

  useEffect(() => {
    reset({
      name: project?.name,
      description: project?.description,
      end_date: project?.end_date
        ? dayjs(project.end_date).format("YYYY-MM-DD")
        : project?.end_date,
      priority: project?.priority,
    });
  }, [project, reset]);

  const onSubmit: SubmitHandler<ProjectData> = async (data) => {
    const projectData = {
      name: data.name,
      description: data.description,
      end_date: data.end_date,
      priority: data.priority,
    };

    console.log(projectData);

    if (project?.id) {
      await updateProjectDetails(projectData, project.id);

      if (!useProjectStore.getState().error) {
        toast.success("Project added successfully!");
        refreshData();
        reset();
        onClose();
      } else {
        toast.error(
          `Failed to add project: ${useProjectStore.getState().error}`,
        );
      }
    } else {
      console.log("no project slug that's why");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
          {/* title */}
          <h2 className="mb-5 text-center text-2xl font-bold">Edit project</h2>

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
                  {...register("name")}
                  required
                  type="text"
                  placeholder="Enter project name"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Start date */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Start date</span>
                </div>
                <input
                  type="date"
                  readOnly
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
                  {...register("priority")}
                  required
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select priority
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>
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

export default EditProjectDetails;
