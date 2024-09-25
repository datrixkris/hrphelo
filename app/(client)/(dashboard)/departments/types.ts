import { Staff } from "@/app/types/user-types";

export interface Department {
    id: number;
    department_id: string;
    name: string;
    staff: Staff[];
    HOD: Staff;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string   
}  