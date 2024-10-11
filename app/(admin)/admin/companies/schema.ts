import { z } from "zod";

// schema for editing company details
export const CompanyDetailsSchema = z.object({
  name: z.string(),
  address: z.string(),
  contact: z.string(),
  email: z.string().email(),
  company_size: z.string(),
});

export const ContactPersonSchema = z.object({
  contact_person: z.string(),
  contact_person_contact: z.string(),
});

export const CompanyDocumentsSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "You must upload at least one file")
    .refine((files) => files[0]?.size <= 5000000, "Max file size is 5MB"), // max file size 5MB
});

// type inferences
export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>;
export type ContactPerson = z.infer<typeof ContactPersonSchema>;
export type CompanyDocuments = z.infer<typeof CompanyDocumentsSchema>;
