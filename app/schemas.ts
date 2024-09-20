// schemas.ts
import { z } from "zod";

// Example schema for user login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const resetSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

// Example schema for user registration
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Inferring types from Zod schemas
export type LoginData = z.infer<typeof loginSchema>;
export type ResetFormData = z.infer<typeof resetSchema>;

export type FirstResetData = {
  password: String,
  confirmPassword: String,
  otp: String,
}