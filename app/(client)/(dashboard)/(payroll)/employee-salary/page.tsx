"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import { toast } from "react-toastify";
import EmployeeSalaryTable from "./components/employee-salary-table";
import { createStaffPayrollData, usePayrollStore } from "../payroll-store";
import AmountInput from "@/app/components/AmountInput";

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
    loading,
  } = usePayrollStore();
  const { staffs, fetchStaff } = useStaffStore();

  const memberOptions = staffs?.map((staff) => ({
    value: staff.id,
    label: staff.name,
  }));

  const payrollPeriodsOptions = payrollPeriods.map((period) => ({
    value: period.id,
    label: period.period,
  }));

  const benefits = payrollPolicies.filter(
    (policy) => policy.pol_type === "Benefit"
  );
  const deduction = payrollPolicies.filter(
    (policy) => policy.pol_type === "Deduction"
  );

  const [selectedStaff, setSelectedStaff] = useState<number | undefined>();
  const [selectedPayrollPeriod, setSelectedPayrollPeriod] = useState<
    number | undefined
  >();
  const [formData, setFormData] = useState<{
    amounts: { [key: string]: string };
    currencies: { [key: string]: string };
  }>({
    amounts: {},
    currencies: {},
  });

  const { handleSubmit, reset } = useForm<PayrollFormData>({
    defaultValues: {
      staffId: null,
      computations: {},
    },
  });

  const handleInputChange = (policyId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      amounts: { ...prev.amounts, [policyId]: value },
    }));
  };

  const handleCurrencyChange = (
    policyId: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      currencies: { ...prev.currencies, [policyId]: event.target.value },
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddSalaryModal = () => setIsModalOpen(true);

  const closeCreateModal = () => {
    setIsModalOpen(false);
    reset();
    setFormData({ amounts: {}, currencies: {} });
  };

  const onSubmit = async (data: PayrollFormData) => {
    if (!selectedStaff && !data.staffId) {
      toast.error("Please select a staff member");
      return;
    }
    if (!selectedPayrollPeriod) {
      toast.error("Please select a payroll period");
      return;
    }

    const computations = [
      ...benefits.map((policy) => ({
        policyId: policy.id,
        value: parseFloat(formData.amounts[policy.id]) || 0,
      })),
      ...deduction.map((policy) => ({
        policyId: policy.id,
        value: parseFloat(formData.amounts[policy.id]) || 0,
      })),
    ];

    const payload: createStaffPayrollData = {
      staffId: selectedStaff || data.staffId!,
      salary_period_id: selectedPayrollPeriod,
      computations,
    };

    try {
      const response = await CreatePayroll(payload);

      if (typeof response === "object" && response.message) {
        toast.error(response.message);
      } else {
        toast.success("Salary created successfully");
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
  }, [staffs, fetchStaff, fetchPayrollPolicy, fetchPayrollPeriod]);

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
            <Button onClick={openAddSalaryModal}>Compute Payroll</Button>
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
              <div className="flex gap-5">
                <div className="w-full">
                  <label className="block font-medium text-gray-700">
                    Payroll period
                  </label>
                  <Select
                    options={payrollPeriodsOptions}
                    onChange={(selected) =>
                      setSelectedPayrollPeriod(selected?.value)
                    }
                    isDisabled={loading}
                    placeholder="Select payroll period"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h5>Benefits</h5>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {benefits.map((policy) => (
                    <AmountInput
                      key={policy.id}
                      label={policy.name}
                      value={formData.amounts[policy.id] || ""}
                      onInputChange={(e) =>
                        handleInputChange(policy.id, e.target.value)
                      }
                      currencyValue={formData.currencies[policy.id] || "USD"}
                      onCurrencyChange={(e) =>
                        handleCurrencyChange(policy.id, e)
                      }
                      currencies={["USD", "EUR", "GBP", "JPY"]}
                      placeholder="0.00"
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h5>Deductions</h5>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {deduction.map((policy) => (
                    <AmountInput
                      key={policy.id}
                      label={policy.name}
                      value={formData.amounts[policy.id] || ""}
                      onInputChange={(e) =>
                        handleInputChange(policy.id, e.target.value)
                      }
                      currencyValue={formData.currencies[policy.id] || "USD"}
                      onCurrencyChange={(e) =>
                        handleCurrencyChange(policy.id, e)
                      }
                      currencies={["USD", "EUR", "GBP", "JPY"]}
                      placeholder="0.00"
                      disabled={loading}
                    />
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