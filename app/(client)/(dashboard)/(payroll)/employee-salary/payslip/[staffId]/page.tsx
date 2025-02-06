// "use client";

// import Logo from "@/app/components/Logo";
// import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import React, { useEffect, useMemo, useState } from "react";
// import { usePayrollStore } from "../../../payroll-store";
// // import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
// // import { useCompanyStore } from "@/app/(admin)/admin/companies/company-store";
// // import { Company } from "@/app/(admin)/admin/companies/types";
// // import { StaffDetail } from "@/app/(client)/(dashboard)/(employee)/staff/types";
// import { useParams } from "next/navigation";

// export default function Page() {
//   const { staffId } = useParams();

//   const { fetchStaffPaySlip, loading, payslip } = usePayrollStore();
//   // const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
//   // const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);

//   console.log("payslip:;", payslip);

//   const paySlipData = payslip?.[0] || {};
//   // const payrollEntries = paySlipData?.payroll || [];
//   // const companyID = paySlipData?.companyId || null;
//   // const staffID = paySlipData?.payroll?.[0]?.staffId || null;

//   // const benefits = useMemo(
//   //   () => payrollEntries.filter((entry) => entry.policy.pol_type === "Benefit"),
//   //   [payrollEntries],
//   // );

//   // const deductions = useMemo(
//   //   () =>
//   //     payrollEntries.filter((entry) => entry.policy.pol_type === "Deduction"),
//   //   [payrollEntries],
//   // );

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!payslip || payslip.length === 0) {
//         await fetchStaffPaySlip(Number(staffId));
//       }

//       // if (!staffDetails && staffID) {
//       //   const data = await fetchStaffById(staffID);
//       //   setStaffDetails(data);
//       // }

//       // if (!companyDetails && companyID) {
//       //   const data = await fetchCompanyById(companyID);
//       //   setCompanyDetails(data);
//       // }
//     };

//     fetchData();
//   }, [
//     payslip,
//     fetchStaffPaySlip,
//     // staffID,
//     // companyDetails,
//     // companyID,
//   ]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="mb-[1.875rem]">
//         <div className="flex items-center justify-between">
//           <PageTitleWithCrumbs
//             title="Payroll Policy"
//             crumbs={[
//               { name: "Dashboard", link: "/dashboard" },
//               { name: "Payroll Policy" },
//             ]}
//           />

//           <div className="flex items-center gap-5">
//             <button className="btn btn-outline">
//               <Icon icon="hugeicons:download-04" />
//               Download
//             </button>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="card bg-base-100">
//           <div className="card-body">
//             <div className="mb-3 flex items-center justify-between border-b">
//               <div className="mb-3">
//                 <div className="mb-2">
//                   <Logo />
//                 </div>
//                 <p>ARS 32 St</p>
//               </div>

//               <div className="mb-3 text-end">
//                 <h5 className="mb-1">
//                   Payslip No <span className="text-primary"> #PS4283</span>
//                 </h5>
//                 <p className="">
//                   Salary Month :{" "}
//                   <span className="text-black">October 2024</span>
//                 </p>
//               </div>
//             </div>
//             {/* <div className="mb-3 flex items-center border-b">
//               <div className="mb-3 w-full">
//                 <p className="mb-2 font-semibold">From</p>
//                 <div>
//                   <h4 className="mb-1 text-xl font-semibold">
//                     {paySlipData.from.name}
//                   </h4>
//                   <p className="mb-1">address</p>
//                   <p className="mb-1">
//                     Email :{" "}
//                     <span className="font-medium">
//                       {paySlipData.from.email}
//                     </span>
//                   </p>
//                   <p>
//                     Phone :{" "}
//                     <span className="font-medium">
//                       {paySlipData.from.phone}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div className="mb-3 w-full">
//                 <p className="mb-2 font-semibold">To</p>
//                 <div>
//                   <h4 className="mb-1 text-xl font-semibold">
//                     {" "}
//                     {paySlipData.to.name}
//                   </h4>
//                   <p className="mb-1">Web Designer</p>
//                   <p className="mb-1">
//                     Email :{" "}
//                     <span className="font-medium">{paySlipData.to.email}</span>
//                   </p>
//                   <p>
//                     Phone :{" "}
//                     <span className="font-medium">{paySlipData.to.phone}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h5 className="mb-4 text-center text-lg font-semibold">
//                 Payslip for {paySlipData.salaryMonth}
//               </h5>
//               <div className="flex gap-5">
//                 <div className="w-full">
//                   <div className="mb-3 divide-y rounded-lg border">
//                     <div className="bg-base-200 p-3 font-medium">
//                       <h3 className="text-md font-semibold"> Benefits</h3>
//                     </div>
//                     {paySlipData.benefits.map((entry) => (
//                       <div className="p-3" key={entry.name}>
//                         <div className="flex justify-between">
//                           <span>{entry.name}</span>
//                           <span className="font-medium">${entry.amount}</span>
//                         </div>
//                       </div>
//                     ))}

//                     <div className="p-3">
//                       <div className="flex items-center justify-between">
//                         <p className="mb-0">Total Earnings</p>
//                         <span className="font-medium">$0000</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full">
//                   <div className="mb-3 divide-y rounded-lg border">
//                     <div className="bg-base-200 p-3 font-medium">
//                       <h6>Deductions</h6>
//                     </div>
//                     {paySlipData.deductions.map((entry) => (
//                       <div key={entry.name} className="p-3">
//                         <div className="flex justify-between">
//                           <span>{entry.name}</span>
//                           <span className="font-medium">${entry.amount}</span>
//                         </div>
//                       </div>
//                     ))}
//                     <div className="p-3">
//                       <div className="flex items-center justify-between">
//                         <p className="mb-0">Total Deductions</p>
//                         <h6 className="font-medium">$00000</h6>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <p>
//                   Net Salary :{" "}
//                   <span className="font-medium text-gray-900">
//                     {paySlipData.netPay.currency}
//                     {paySlipData.netPay.value}
//                   </span>
//                 </p>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;
