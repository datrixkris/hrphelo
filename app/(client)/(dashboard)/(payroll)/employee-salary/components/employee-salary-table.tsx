import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { usePayrollStore } from "../../payroll-store";
import { useStaffStore } from "../../../staff/staff-store";
import TableSkeleton from "@/app/components/TableSkeleton";

const EmployeeSalaryTable = () => {
  const { payrolls, fetchPayroll } = usePayrollStore();
  const { fetchStaff, staffs } = useStaffStore();
  const [loading, setLoading] = React.useState(true);

  console.log("Payrolls::", payrolls);

  // staff that has payrolls
  const staffWithPayrolls = useMemo(() => {
    if (!staffs || staffs.length === 0 || !payrolls || payrolls.length === 0)
      return [];

    return staffs
      .map((staff) => {
        const payroll = payrolls.find((payroll) => payroll.to.id === staff.id);
        if (payroll) {
          return {
            ...staff,
            payslip_uri: payroll.payslip_uri,
            net_pay: payroll.netPay,
          };
        }
        return null;
      })
      .filter((staff) => staff !== null);
  }, [staffs, payrolls]);

  console.log("staffWithPayrolls::", staffWithPayrolls);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (payrolls.length === 0) await fetchPayroll();
        if (!staffs) await fetchStaff();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [staffs, fetchPayroll, fetchStaff]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg rounded border border-base-300 bg-base-100">
        <thead>
          <tr>
            <th scope="col">EMP ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Designation</th>
            <th scope="col">Joining Date</th>
            <th scope="col">Salary</th>
            <th scope="col">Payslip</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {staffWithPayrolls.length > 0 ? (
          <tbody>
            {staffWithPayrolls.map((staff) => (
              <tr key={staff.id} className="!text-sm">
                <td>{staff.staffId}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.contact}</td>
                <td>{staff.designation}</td>
                <td>{dayjs(staff.hiring_date).format("MMM D, YYYY")}</td>
                <td>
                  {staff.net_pay.currency}
                  {staff.net_pay.value}
                </td>
                <td>
                  <Link
                    href={staff.payslip_uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn">
                      <span className="ml-1">Generate Slip</span>
                    </button>
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="mage:edit"
                      className="h-6 w-6 cursor-pointer text-blue-500"
                      aria-label="Edit policy"
                      onClick={() => console.log(`Edit staff ${staff.id}`)}
                    />
                    <Icon
                      icon="weui:delete-outlined"
                      className="h-6 w-6 cursor-pointer text-red-500"
                      aria-label="Delete policy"
                      onClick={() => console.log(`Delete staff ${staff.id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={9} className="text-center">
                No staff with payrolls found.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default EmployeeSalaryTable;
