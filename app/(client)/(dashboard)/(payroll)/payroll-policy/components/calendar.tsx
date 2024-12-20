"use client";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { usePayrollStore } from "../../payroll-store";
import { toast } from "react-toastify";




export default function Calendar() {
  const { payrollPeriods, CreatePayrollPeriod, fetchPayrollPeriod } =
    usePayrollStore();

  const salaryPeriod = payrollPeriods[0];

  // State for date selection range
  const [selectionRange, setSelectionRange] = useState({
    startDate: subDays(new Date(), 7),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  // State for button loading
  const [loading, setLoading] = useState(false);

  // Handles date selection from the DateRangePicker
  function handleSelect(ranges: RangeKeyDict) {
    const { startDate, endDate, key } = ranges.selection;
    setSelectionRange({
      startDate: startDate ?? new Date(),
      endDate: endDate ?? new Date(),
      key: key ?? "selection",
    });

  }

  // Async function to create a payroll period
  async function createPeriod() {
    const startDateFormatted = selectionRange.startDate.toLocaleDateString(
      "en-GB",
      { day: "2-digit", month: "long", year: "numeric" },
    );
    const endDateFormatted = selectionRange.endDate.toLocaleDateString(
      "en-GB",
      { day: "2-digit", month: "long", year: "numeric" },
    );

    const data: string = `${startDateFormatted} - ${endDateFormatted}`;

    try {
      setLoading(true);
      const success = await CreatePayrollPeriod({ period: data }); // Correct function call
      if (success) {
        toast.success("Payroll Period created successfully");
      } else {
        toast.error("Failed to create Payroll Period");
      }
    } catch (error) {
      toast.error("Failed to create Payroll Period");
    } finally {
      setLoading(false); // End form loading
    }
  }

  useEffect(() => {
    if (payrollPeriods.length === 0) {
      fetchPayrollPeriod();
    }
  }, [payrollPeriods, fetchPayrollPeriod]);

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <div className="text-center font-medium">Create New Payroll Period</div>
      <div className="mb-5 text-center">
        Current Payroll Period:{" "}
        <span className="font-medium">{salaryPeriod?.period}</span>
      </div>

      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
      />
      <div className="text-right">
        {" "}
        <button
          className="btn"
          onClick={createPeriod}
          disabled={loading} // Optional: Disable button while loading
        >
          {loading ? "Creating..." : "Create Payroll Period"}
        </button>
      </div>
    </div>
  );
}
