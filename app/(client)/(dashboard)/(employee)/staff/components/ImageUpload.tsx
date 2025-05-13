import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  image?: string; 
  disabled?: boolean; 
  maxFileSize?: number;
  id: string; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  image,
  disabled = false,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  id,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle image preview when an existing image URL is provided
  useEffect(() => {
    if (image) {
      setPreview(image);
      setError(null);
    } else {
      setPreview(null);
    }
  }, [image]);

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (e.g., PNG, JPEG).");
        onImageSelect(null);
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        setError(`Image size must be less than ${maxFileSize / (1024 * 1024)}MB.`);
        onImageSelect(null);
        return;
      }

      // Generate preview and notify parent
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageSelect(file);
    } else {
      setPreview(image || null);
      onImageSelect(null);
    }
  };

  return (
    <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-base-300">
      {preview ? (
        <img
          src={preview}
          alt="Image preview"
          className="h-full w-full object-contain"
          onError={() => setError("Failed to load image preview.")}
        />
      ) : (
        <Icon
          icon="heroicons:camera"
          className="text-4xl text-neutral-400"
          aria-hidden="true"
        />
      )}
      <label
        htmlFor={id} 
        className={`absolute bottom-2 right-2 cursor-pointer rounded-full bg-base-100 p-2 shadow-md transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-base-200"
        }`}
        aria-label="Upload image"
      >
        <Icon icon="heroicons:pencil" className="text-2xl text-neutral-600" />
      </label>
      <input
        type="file"
        accept="image/*"
        id={id} 
        className="hidden"
        onChange={handleImageChange}
        disabled={disabled}
      />
      {error && (
        <div className="absolute bottom-0 w-full bg-error bg-opacity-80 p-1 text-center text-xs text-white">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;