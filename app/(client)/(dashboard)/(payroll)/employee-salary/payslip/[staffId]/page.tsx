"use client";

import Logo from "@/app/components/Logo";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useMemo, useState } from "react";
import { usePayrollStore } from "../../../payroll-store";
import { useStaffStore } from "../../../../staff/staff-store";
import { useCompanyStore } from "@/app/(admin)/admin/companies/company-store";
import { Company } from "@/app/(admin)/admin/companies/types";
import { StaffDetail } from "../../../../staff/types";
import { useParams } from "next/navigation";

export default function Page() {
  const { staffId } = useParams();

  const { fetchStaffPaySlip, loading, payslip } = usePayrollStore();
  const { fetchStaffById } = useStaffStore();
  const { fetchCompanyById } = useCompanyStore();
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);

  const paySlipData = payslip?.[0] || {};

console.log("slip::",paySlipData);


  useEffect(() => {
    const fetchData = async () => {
      if (!payslip || payslip.length === 0) {
        await fetchStaffPaySlip(Number(staffId));
      }
    };

    fetchData();
  }, [
    payslip,
    fetchStaffPaySlip,
    fetchStaffById,
    companyDetails,
    fetchCompanyById,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src=""
        style={{ height: "100%", width: "100%" }}
      />
    </div>
    </div>
  );
}
