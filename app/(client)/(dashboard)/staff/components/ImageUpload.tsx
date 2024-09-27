import React from "react";
import { Icon } from "@iconify/react";

const ImageUpload = () => {
  return (
    <div className="relative size-32 rounded-full border">
      <div className="absolute bottom-2 right-2 rounded-full bg-base-100">
        <label htmlFor="image">
          <Icon icon="heroicons:camera" className="cursor-pointer text-2xl" />
        </label>
      </div>
      <input type="file" accept="image/*" className="invisible" id="image" />
    </div>
  );
};

export default ImageUpload;
