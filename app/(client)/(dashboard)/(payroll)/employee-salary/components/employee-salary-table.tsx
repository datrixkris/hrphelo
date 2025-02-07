import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
// import dayjs from "dayjs";
import { usePayrollStore } from "../../payroll-store";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import TableSkeleton from "@/app/components/TableSkeleton";

const EmployeeSalaryTable = () => {
  const { payrolls, fetchPayroll } = usePayrollStore();
  const { fetchStaff, staffs } = useStaffStore();
  const [loading, setLoading] = React.useState(true);

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
            {/* <th scope="col"></th> */}
          </tr>
        </thead>
        {payrolls.length > 0 ? (
          <tbody>
            {payrolls.map((payroll, index) => (
              <tr key={index} className="!text-sm">
                <td>{payroll.to.id}</td>
                <td>{payroll.to.name}</td>
                <td>{payroll.to.email}</td>
                <td>{payroll.to.phone}</td>
                <td>tester</td>
                <td>78888</td>
                <td>
                  {payroll.netPay.currency}
                  {payroll.netPay.value}
                </td>
                <td>
                  <Link href={`employee-salary/payslip/${payroll.payslipNo}`}>
                    <button className="btn bg-green-400">
                      <span className="text-sm">View Slip</span>
                    </button>
                  </Link>
                </td>

                {/* <td>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="mage:edit"
                      className="h-6 w-6 cursor-pointer text-blue-500"
                      aria-label="Edit policy"
                      // onClick={() => console.log(`Edit staff ${staff.id}`)}
                    />
                    <Icon
                      icon="weui:delete-outlined"
                      className="h-6 w-6 cursor-pointer text-red-500"
                      aria-label="Delete policy"
                      // onClick={() => console.log(`Delete staff ${staff.id}`)}
                    />
                  </div>
                </td> */}
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
