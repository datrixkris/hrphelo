"use client";
import React, { useState, useEffect } from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import ImageUpload from "../(employee)/staff/components/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { useSettingsStore } from "./setting-store";

// Define form schema with Zod
const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  contact_person: z.string().min(1, "Contact person name is required"),
  contact_person_contact: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Invalid contact person phone number"),
  contact: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Invalid company phone number"),
  email: z.string().email("Invalid email address"),
  company_size: z.string().min(1, "Company size is required"),
  password_expiry_duration: z.coerce
    .number()
    .min(1, "Password expiry duration is required"),
});

type CompanyFormData = z.infer<typeof companySchema>;

const SettingsPage = () => {
  const { company, loading, updateCompanyDetails, fetchCompany } =
    useSettingsStore();
  const [activeTab, setActiveTab] = useState("general");
  const [lightThemeLogo, setLightThemeLogo] = useState<File | null>(null);
  const [darkThemeLogo, setDarkThemeLogo] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      address: "",
      contact_person: "",
      contact_person_contact: "",
      contact: "",
      email: "",
      company_size: "",
      password_expiry_duration: 0,
    },
  });

  // Populate form with company data when available
  useEffect(() => {
    if (company && !loading) {
      reset({
        name: company.name || "",
        address: company.address || "",
        contact_person: company.contact_person || "",
        contact_person_contact: company.contact_person_contact || "",
        contact: company.contact || "",
        email: company.email || "",
        company_size: company.company_size || "",
        password_expiry_duration: company.password_expiry_duration || 0,
      });
    }
  }, [company, loading, reset]);

  // Fetch company data on mount if not already loaded
  useEffect(() => {
    if (!company && !loading) {
      fetchCompany();
    }
  }, [company, loading, fetchCompany]);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hrphelo");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      toast.error("Failed to upload image.");
      throw error;
    } finally {
      setImageLoading(false);
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    try {
      let lightThemeLogoUrl = "";
      let darkThemeLogoUrl = "";

      if (lightThemeLogo) {
        lightThemeLogoUrl = await uploadImageToCloudinary(lightThemeLogo);
      }
      if (darkThemeLogo) {
        darkThemeLogoUrl = await uploadImageToCloudinary(darkThemeLogo);
      }

      await updateCompanyDetails({
        ...data,
        company_light_theme_logo: lightThemeLogoUrl,
        company_dark_theme_logo: darkThemeLogoUrl,
      });

      toast.success("Settings updated successfully!");
      reset(data);
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
    }
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "other", label: "Other Settings" },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">Fetching company details...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <PageTitleWithCrumbs
          title="Company Settings"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Company Settings" },
          ]}
        />
      </div>

      <div className="tabs-boxed tabs rounded-lg bg-base-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            disabled={isSubmitting || imageLoading}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "general" && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">General Settings</h2>
              <p className="mb-6 text-neutral-500">
                Update your company information and preferences.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Logo Upload Section */}
                <div className="mb-8 flex flex-col gap-6 sm:flex-row">
                  {/* Light Theme Logo */}
                  <div className="flex flex-1 items-start gap-4">
                    <div className="rounded-lg bg-white">
                      <ImageUpload
                        id="light-theme-logo-upload"
                        onImageSelect={(file) => setLightThemeLogo(file)}
                        image={company?.company_light_theme_logo}
                        disabled={imageLoading || isSubmitting}
                      />
                    </div>
                    <div className="">
                      <p className="mt-2 text-sm">Light Theme Logo</p>
                      {lightThemeLogo && (
                        <p className="mt-1 text-xs">{lightThemeLogo.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Dark Theme Logo */}
                  <div className="flex flex-1 items-start gap-4">
                    <div className="rounded-lg bg-neutral-900">
                      <ImageUpload
                        id="dark-theme-logo-upload"
                        onImageSelect={(file) => setDarkThemeLogo(file)}
                        image={company?.company_dark_theme_logo}
                        disabled={imageLoading || isSubmitting}
                      />
                    </div>
                    <div className="">
                      <p className="mt-2 text-sm">Dark Theme Logo</p>
                      {darkThemeLogo && (
                        <p className="mt-1 text-xs">{darkThemeLogo.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[
                    {
                      name: "name",
                      label: "Company Name",
                      description: "Update company's name",
                      type: "text",
                    },
                    {
                      name: "address",
                      label: "Company Address",
                      description: "Update company's address",
                      type: "text",
                    },
                    {
                      name: "contact_person",
                      label: "Contact Person",
                      description: "Update contact person's name",
                      type: "text",
                    },
                    {
                      name: "contact_person_contact",
                      label: "Contact Person Phone",
                      description: "Update contact person's phone number",
                      type: "tel",
                    },
                    {
                      name: "contact",
                      label: "Company Telephone",
                      description: "Update company's telephone contact",
                      type: "tel",
                    },
                    {
                      name: "email",
                      label: "Company Email Address",
                      description: "Update company's email address",
                      type: "email",
                    },
                    {
                      name: "company_size",
                      label: "Company Size",
                      description: "Update company's size",
                      type: "text",
                    },
                    {
                      name: "password_expiry_duration",
                      label: "Password Expiry Duration",
                      description:
                        "Update password expiry duration in days. (0 for no expiry)",
                      type: "number",
                    },
                  ].map((field) => (
                    <div key={field.name} className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          {field.label}
                        </span>
                      </label>
                      <Controller
                        name={field.name as keyof CompanyFormData}
                        control={control}
                        render={({ field: formField }) => (
                          <input
                            {...formField}
                            type={field.type}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            className={`input input-bordered w-full ${
                              errors[field.name as keyof CompanyFormData]
                                ? "input-error"
                                : ""
                            }`}
                            disabled={isSubmitting || imageLoading}
                          />
                        )}
                      />
                      <label className="label">
                        <span className="label-text-alt text-neutral-400">
                          {field.description}
                        </span>
                      </label>
                      {errors[field.name as keyof CompanyFormData] && (
                        <p className="mt-1 text-sm text-error">
                          {errors[field.name as keyof CompanyFormData]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || imageLoading}
                  >
                    {isSubmitting || imageLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "other" && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Other Settings</h2>
              <p className="text-neutral-500">
                Additional settings will be implemented here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
