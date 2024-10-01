import Button from "@/app/components/Button";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CompanyDocuments, CompanyDocumentsSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/app/axiosApi/api";
import { useParams } from "next/navigation";

const UpdateCompanyDocuments = () => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDocuments>({
    resolver: zodResolver(CompanyDocumentsSchema),
  });

  const onSubmit: SubmitHandler<CompanyDocuments> = async (data) => {
    // Create a FormData object to send the files to the API
    const formData = new FormData();

    // Append each file in the FileList to the FormData object
    Array.from(data.file).forEach((file) => {
      formData.append("files", file); // "files" is the key for the API to handle multiple files
    });

    // loging files to console
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await api.post(
        `/v1/companies/documents/${params.companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        },
      );

      if (response.status === 200) {
        console.log("Files uploaded successfully");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="flex items-end justify-between border-b border-base-300 pb-2">
          <div className="">
            <h3 className="text-xl font-semibold">Company documents</h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s documents
            </p>
          </div>

          <Button>Update Company Documents</Button>
        </div>

        {/* forms */}
        <div className="space-y-4 py-5">
          {/* Contact person details */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Business Certificate</h3>
              <p className="text-neutral-400">Select business certificate</p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                multiple
                type="file"
                {...register("file")}
                placeholder="Type here"
                className="file-input input-bordered w-full"
              />
              {errors.file && <p>{errors.file.message}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCompanyDocuments;
