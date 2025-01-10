import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ImageUpload = ({
  onImageSelect,
  image,
}: {
  onImageSelect: (file: File | null) => void;
  image?: string;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(image);
    }
  }, [image]);

  return (
    <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border">
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <Icon icon="heroicons:camera" className="text-4xl" />
      )}
      <label
        htmlFor="image-upload"
        className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-base-100 p-1"
      >
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
