"use client";

import Logo from "@/app/components/Logo";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { usePayrollStore } from "../../../payroll-store";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import { numberToMonth } from "@/utils/functions";

export default function Page() {
  const params = useParams<{ staffId: string }>();

  const { fetchStaffPaySlip, loading, payslip } = usePayrollStore();

  const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!payslip) {
        await fetchStaffPaySlip(params.staffId);
      }
    };

    fetchData();
  }, [payslip, fetchStaffPaySlip]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-[1.875rem]">
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Payroll Policy"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Employee Salary", link: "/employee-salary" },
              { name: "Payslip" },
            ]}
          />

          <button className="btn btn-outline">
            <Link
              href={`${BaseURL}${payslip?.payslip_uri}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5"
            >
              {" "}
              <Icon icon="hugeicons:download-04" />
              Download
            </Link>
          </button>
        </div>
      </div>
      <div>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="mb-3 flex items-center justify-between border-b">
              <div className="mb-3">
                <div className="mb-2">
                  <Logo />
                </div>
                <p>ARS 32 St</p>
              </div>

              <div className="mb-3 text-end">
                <h5 className="mb-1">
                  Payslip No{" "}
                  <span className="text-primary"> #{payslip?.payslipNo}</span>
                </h5>
                <p className="">
                  Salary Month :{" "}
                  <span className="text-black">
                    {numberToMonth(Number(payslip?.salaryMonth))}
                    {/* 2024 */}
                  </span>
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-center border-b">
              <div className="mb-3 w-full">
                <p className="mb-2 font-semibold">From</p>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">
                    {payslip?.from.name}
                  </h4>
                  <p className="mb-1">address</p>
                  <p className="mb-1">
                    Email :{" "}
                    <span className="font-medium">{payslip?.from.email}</span>
                  </p>
                  <p>
                    Phone :{" "}
                    <span className="font-medium">{payslip?.from.phone}</span>
                  </p>
                </div>
              </div>
              <div className="mb-3 w-full">
                <p className="mb-2 font-semibold">To</p>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">
                    {" "}
                    {payslip?.to.name}
                  </h4>
                  <p className="mb-1">Web Designer</p>
                  <p className="mb-1">
                    Email :{" "}
                    <span className="font-medium">{payslip?.to.email}</span>
                  </p>
                  <p>
                    Phone :{" "}
                    <span className="font-medium">{payslip?.to.phone}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              {/* <h5 className="mb-4 text-center text-lg font-semibold">
                Payslip for {payslip?.salaryMonth}
              </h5> */}
              <div className="flex gap-5">
                <div className="w-full">
                  <div className="mb-3 divide-y rounded-lg border">
                    <div className="rounded-lg bg-base-200 p-3 font-medium">
                      <h3 className="text-md font-semibold"> Benefits</h3>
                    </div>
                    {payslip?.benefits.map((entry) => (
                      <div className="p-3" key={entry.name}>
                        <div className="flex justify-between">
                          <span>{entry.name}</span>
                          <span className="font-medium">${entry.amount}</span>
                        </div>
                      </div>
                    ))}

                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="mb-0">Total Earnings</p>
                        <span className="font-medium">
                          {payslip?.totalBenefits}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-3 divide-y rounded-lg border">
                    <div className="rounded-lg bg-base-200 p-3 font-medium">
                      <h6>Deductions</h6>
                    </div>
                    {payslip?.deductions.map((entry) => (
                      <div key={entry.name} className="p-3">
                        <div className="flex justify-between">
                          <span>{entry.name}</span>
                          <span className="font-medium">{entry.amount}</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="mb-0">Total Deductions</p>
                        <h6 className="font-medium">
                          {payslip?.totalDeductions}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  Net Salary :{" "}
                  <span className="font-medium text-gray-900">
                    {payslip?.netPay.currency}
                    {payslip?.netPay.value}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
