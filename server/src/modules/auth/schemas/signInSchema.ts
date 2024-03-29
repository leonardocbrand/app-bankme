import { z } from 'zod';

export const signInSchema = z
  .object({
    login: z.string().min(5).max(20),
    password: z.string().min(6),
  })
  .required();

export type SignInDto = z.infer<typeof signInSchema>;
