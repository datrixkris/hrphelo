"use client";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { usePayrollStore } from "../payroll-store";
import Calendar from "./components/calendar";
import PayrollConfigTable from "./components/payroll-config-table";
import HasAccess from "@/app/(client)/components/HasAccess";
import { useHasPermission } from "@/app/hooks/permissions";

const payrollPolicySchema = z.object({
  name: z.string().min(4, {
    message: "Policy name is required ",
  }),
  pol_type: z.string().nonempty("Policy type is required"),
});

export type TPayrollPolicy = z.infer<typeof payrollPolicySchema>;

const Page = () => {
  const { addPayrollPolicy } = usePayrollStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPayrollPolicy>({
    resolver: zodResolver(payrollPolicySchema),
  });

  // permission to create
  const hasCreatePermission = useHasPermission("create", "Payroll Policy");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Function to open the modal
  const openAddSalaryModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeCreateModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Function to handle form submission
  const handleAddPolicy = async (data: TPayrollPolicy) => {
    try {
      setFormLoading(true); // Start form loading
      const success = await addPayrollPolicy(data);
      if (success) {
        toast.success("Payroll Policy created successfully");
        closeCreateModal();
      } else {
        toast.error("Failed to add Payroll Policy");
      }
    } catch (error) {
      toast.error("Failed to add Payroll Policy");
    } finally {
      setFormLoading(false); // End form loading
    }
  };

  return (
    <HasAccess module="Payroll Policy">
      <div>
        <div>
          <div className="mb-[1.875rem]">
            <div className="flex items-center justify-between">
              <PageTitleWithCrumbs
                title="Payroll Policy"
                crumbs={[
                  { name: "Dashboard", link: "/dashboard" },
                  { name: "Payroll Policy" },
                ]}
              />

              <div className="flex items-center gap-5">
                <button className="btn btn-outline">
                  {" "}
                  <Icon icon="hugeicons:file-export" />
                  Export
                </button>

                {hasCreatePermission && (
                  <Button onClick={openAddSalaryModal}>
                    Add Payroll Policy
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap"
            aria-label="Payroll Policies"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <div>
              <PayrollConfigTable />
            </div>{" "}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap"
            aria-label="Payroll Period"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <Calendar />
          </div>

          {/* <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Tab 3"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            Tab content 3
          </div> */}
        </div>

        {/* Add salary Modal */}
        {isModalOpen && (
          <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
              <h3 className="text-lg font-bold">Add Payroll Policy</h3>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleAddPolicy)}
              >
                <div>
                  <label className="block font-medium text-gray-700">
                    Policy Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="input input-bordered w-full"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Policy Type
                  </label>
                  <select
                    {...register("pol_type")}
                    className="select select-bordered w-full"
                  >
                    <option disabled selected>
                      Policy type
                    </option>
                    <option value="Deduction">Deduction</option>
                    <option value="Benefit">Benefit</option>
                  </select>
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="modal-action flex justify-end">
                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="btn mr-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary rounded ${
                      formLoading ? "loading" : ""
                    }`}
                  >
                    {formLoading ? "Creating..." : "Create Policy"}
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-backdrop" onClick={closeCreateModal}></div>
          </div>
        )}
      </div>
    </HasAccess>
  );
};

export default Page;
