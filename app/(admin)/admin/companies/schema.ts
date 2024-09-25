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
  document: z.array(z.instanceof(File)),
});

// type inferences
export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>;
export type ContactPerson = z.infer<typeof ContactPersonSchema>;
export type CompanyDocuments = z.infer<typeof CompanyDocumentsSchema>;
