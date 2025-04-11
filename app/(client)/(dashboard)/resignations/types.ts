import { StaffData } from "../(employee)/staff/types";

export interface Resignation {
  id: number;
  companyId: number;
  staffId: number;
  resignation_date: string; // You can use `Date` if you parse it with dayjs or new Date()
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  staff: StaffData;
  // staff: {
  //   id: number;
  //   name: string;
  //   email: string;
  //   contact: string;
  // };
}
