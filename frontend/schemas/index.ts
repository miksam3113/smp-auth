import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string().trim(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters long",
  }),
  username: z.string().min(4, {
    message: "Username is required", //TODO: username validation
  }),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
});
