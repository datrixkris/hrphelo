import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ImageUpload = ({ onImageSelect }: { onImageSelect: (file: File | null) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file); // Pass the selected file to the parent component
    }
  };

  return (
    <div className="relative w-32 h-32 rounded-full border overflow-hidden flex items-center justify-center">
      {preview ? (
        <img src={preview} alt="Preview" className="object-cover w-full h-full" />
      ) : (
        <Icon icon="heroicons:camera" className="text-4xl" />
      )}
      <label htmlFor="image-upload" className="absolute bottom-2 right-2 bg-base-100 rounded-full p-1 cursor-pointer">
        <Icon icon="heroicons:camera" className="text-2xl" />
      </label>
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
