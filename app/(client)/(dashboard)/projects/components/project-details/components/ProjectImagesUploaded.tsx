import React from "react";

const ProjectImagesUploaded = () => {
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      <h2 className="mb-2 text-lg font-semibold capitalize text-base-content">
        Uploaded Image Files
      </h2>

      {true ? (
        <div className="text-neutral-400">No images uploaded</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          <div className="">
            <div className="aspect-video w-56 bg-neutral-300"></div>
            <p>demo.png</p>
          </div>
          <div className="">
            <div className="aspect-video w-56 bg-neutral-300"></div>
            <p>demo.png</p>
          </div>
          <div className="">
            <div className="aspect-video w-56 bg-neutral-300"></div>
            <p>demo.png</p>
          </div>
          <div className="">
            <div className="aspect-video w-56 bg-neutral-300"></div>
            <p>demo.png</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectImagesUploaded;
