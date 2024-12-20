"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useStaffStore } from "../../staff/staff-store";
import { toast } from "react-toastify";
import EmployeeSalaryTable from "./components/employee-salary-table";
import { createStaffPayrollData, usePayrollStore } from "../payroll-store";

interface PayrollFormData {
  staffId: number | null;
  computations: { [key: string]: number };
}

const Page = () => {
  const {
    payrollPolicies,
    fetchPayrollPolicy,
    payrollPeriods,
    fetchPayrollPeriod,
    CreatePayroll,
  } = usePayrollStore();
  const { staffs, loading, fetchStaff } = useStaffStore();

  const memberOptions = staffs?.map((staff) => ({
    value: staff.id,
    label: staff.name,
  }));

  const benefits = payrollPolicies.filter(
    (policy) => policy.pol_type === "Benefit",
  );
  const deduction = payrollPolicies.filter(
    (policy) => policy.pol_type === "Deduction",
  );

  const [selectedStaff, setSelectedStaff] = useState<number | undefined>();
  const [formData, setFormData] = useState<{ [key: string]: number }>({});

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      staffId: null,
      computations: {},
    },
  });

  const handleInputChange = (policyId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [policyId]: parseFloat(value) || 0,
    }));
  };

  const salaryPeriod = payrollPeriods[0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openAddSalaryModal = () => setIsModalOpen(true);

  const closeCreateModal = () => {
    setIsModalOpen(false);
    reset();
    setFormData({});
  };

  const onSubmit = async (data: PayrollFormData) => {
    if (!selectedStaff && !data.staffId) {
      toast.error("Please select a staff member");
      return;
    }

    const computations = [
      ...benefits.map((policy) => ({
        policyId: policy.id,
        value: formData[policy.id] || 0,
      })),
      ...deduction.map((policy) => ({
        policyId: policy.id,
        value: formData[policy.id] || 0,
      })),
    ];

    const payload: createStaffPayrollData = {
      staffId: selectedStaff || data.staffId!,
      salary_period_id: salaryPeriod.id,
      computations,
    };

    try {
      console.log("Form submitted successfully", payload);
      const success = await CreatePayroll(payload);

      if (success) {
        toast.success("Salary created successfully");
        closeCreateModal();
      } else {
        toast.error("Failed to add salary");
      }
      closeCreateModal();
    } catch (err) {
      console.error(err);

      toast.error("Failed to add salary");
    }
  };

  useEffect(() => {
    if (staffs.length === 0) {
      fetchStaff();
    }

    if (payrollPolicies.length === 0) {
      fetchPayrollPolicy();
    }
    if (payrollPeriods.length === 0) {
      fetchPayrollPeriod();
    }
  }, [staffs, fetchStaff]);

  return (
    <div>
      <div className="mb-[1.875rem]">
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Employee Salary"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Employee Salary" },
            ]}
          />
          <div className="flex items-center gap-5">
            <button className="btn btn-outline">
              <Icon icon="hugeicons:file-export" />
              Export
            </button>
            <Button onClick={openAddSalaryModal}>Add Salary</Button>
          </div>
        </div>
      </div>

      <div>
        <EmployeeSalaryTable />
      </div>

      {/* Add salary Modal */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="text-lg font-bold">Add Employee Salary</h3>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-5">
                <div className="w-full">
                  <label className="block font-medium text-gray-700">
                    Staff
                  </label>
                  <Select
                    options={memberOptions}
                    onChange={(selected) => setSelectedStaff(selected?.value)}
                    isDisabled={loading}
                    placeholder="Select staff"
                  />
                </div>
              </div>

              {/* Payroll Policy Fields */}
              <div>
                <h5>Benefits</h5>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {benefits.map((policy) => (
                    <div key={policy.id}>
                      <label className="block font-medium text-gray-700">
                        {policy.name}
                      </label>
                      <input
                        type="number"
                        value={formData[policy.id] || ""}
                        onChange={(e) =>
                          handleInputChange(policy.id, e.target.value)
                        }
                        className="input input-bordered w-full"
                        placeholder="Enter amount"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5>Deduction</h5>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {deduction.map((policy) => (
                    <div key={policy.id}>
                      <label className="block font-medium text-gray-700">
                        {policy.name}
                      </label>
                      <input
                        type="number"
                        value={formData[policy.id] || ""}
                        onChange={(e) =>
                          handleInputChange(policy.id, e.target.value)
                        }
                        className="input input-bordered w-full"
                        placeholder="Enter amount"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
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
                  className={`btn btn-primary rounded ${loading ? "loading" : ""}`}
                >
                  {loading ? "Saving..." : "Save Salary"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeCreateModal}></div>
        </div>
      )}
    </div>
  );
};

export default Page;
