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

  const BaseURL = process.env.NEXT_PUBLIC_BaseURL;

  console.log("Payrolls::", BaseURL);

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
  // console.log(`${BaseURL}${payroll.payslip_uri}`);

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
            {payrolls.map((payroll) => (
              <tr key={payroll.payslipNo} className="!text-sm">
                <td>6666</td>
                <td>{payroll.to.name}</td>
                <td>{payroll.to.email}</td>
                <td>{payroll.to.phone}</td>
                <td>tester</td>
                <td>78888</td>
                <td>
                  {payroll.netPay.currency}
                  {payroll.netPay.value}
                </td>
                {/* <td>
                  {payroll.payslip_uri ? (
                    <Link
                      href={`${BaseURL}${payroll.payslip_uri}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
           
                      
                      <button className="btn bg-green-300 ">
                        <span className="text-sm">View Slip</span>
                      </button>
                    </Link>
                  ) : (
                    <span>No payslip</span> 
                  )}
                </td> */}
                <td>
                  <Link
                    href={`employee-salary/payslip/${payroll.to.id}`}
                  >
                    <button className="btn bg-green-300">
                      <span className="text-sm">View Slip</span>
                    </button>
                  </Link>
                </td>

                <td>
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
