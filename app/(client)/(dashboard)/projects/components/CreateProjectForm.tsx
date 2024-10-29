import React from "react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectData } from "../types/project-types";
import { useProjectStore } from "../stores/project-store";
import { toast } from "react-toastify";

const CreateProjectForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<ProjectData>();
  const { createProject, updatingData, fetchProjects, error, projects } =
    useProjectStore();

  const onSubmit: SubmitHandler<ProjectData> = async (data) => {
    const projectData = {
      name: data.name,
      description: data.description,
    };

    await createProject(projectData);

    if (!error) {
      toast.success("Project added successfully!");
      fetchProjects();
      reset();
      onClose();
    } else {
      toast.error(`Failed to add project: ${error}`);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
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
                  <span className="label-text">
                    Start date <span className="text-error">*</span>
                  </span>
                </div>
                <input type="date" className="input input-bordered w-full" />
              </label>

              {/* End date */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">End date</span>
                </div>
                <input type="date" className="input input-bordered w-full" />
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
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>

              {/* Project Leader */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select project lead</span>
                </div>
                <select
                  defaultValue=""
                  className="select select-bordered w-full"
                >
                  <option>Kojo</option>
                  <option>Kwesi</option>
                  <option>Adjoa</option>
                </select>
              </label>

              <div className=""></div>

              {/* Team Members */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select team members</span>
                </div>
                <select
                  defaultValue=""
                  className="select select-bordered w-full"
                >
                  <option>Kojo</option>
                  <option>Kwesi</option>
                  <option>Adjoa</option>
                </select>
              </label>

              <div className=""></div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label htmlFor="" className="label-text">
                Description <span className="text-error">*</span>
              </label>
              <textarea
                required
                {...register("name")}
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
