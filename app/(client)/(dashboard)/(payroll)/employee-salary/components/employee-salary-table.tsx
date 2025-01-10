import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { usePayrollStore } from "../../payroll-store";
import { useStaffStore } from "../../../staff/staff-store";

const EmployeeSalaryTable = () => {
  const { payrolls, fetchPayroll } = usePayrollStore();
  const { fetchStaff, staffs } = useStaffStore();

  // staff that has payrolls (only get staffs where id is = payroll.payroll.staffId)

  // Filter staff that has payrolls
  const staffWithPayrolls = useMemo(() => {
    if (!staffs || staffs.length === 0 || payrolls.length === 0) return [];
    return staffs.filter((staff) =>
      payrolls.some((payroll) => payroll.payroll?.[0]?.staffId === staff.id),
    );
  }, [staffs, payrolls]);

  console.log("staffWithPayrolls::", staffWithPayrolls);

  useEffect(() => {
    const fetchData = async () => {
      if (payrolls.length === 0) {
        await fetchPayroll();
      }
      console.log("get");

      if (!staffs) {
        await fetchStaff();
      }
    };
    fetchData();
  }, [payrolls, staffs, fetchPayroll, fetchStaff]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg rounded border border-base-300 bg-base-100">
        {/* Table Head */}
        <thead>
          <tr>
            <th>EMP ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Salary</th>
            <th>Payslip</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {staffWithPayrolls.map((staff) => (
            <tr key={staff.id} className="!text-sm">
              <td>{staff.staffId}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.contact}</td>
              <td>{staff.designation}</td>
              <td>{dayjs(staff.hiring_date).format("MMM D, YYYY")}</td>
              <td>$0</td>
              <td>
                <Link href={`employee-salary/payslip/${staff.id}`}>
                  <button className="btn">
                    <span className="ml-1">Generate Slip</span>
                  </button>
                </Link>
              </td>
              <td>
                {" "}
                <div className="flex items-center gap-1">
                  <Icon
                    icon="mage:edit"
                    className="h-6 w-6 cursor-pointer text-blue-500"
                    aria-label="Edit policy"
                    // onClick={() => ()}
                  />
                  <Icon
                    icon="weui:delete-outlined"
                    className="h-6 w-6 cursor-pointer text-red-500"
                    aria-label="Delete policy"
                    // onClick={() => ()}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSalaryTable;
