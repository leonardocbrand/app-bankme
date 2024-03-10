import { z } from 'zod';

export const createUserSchema = z
  .object({
    login: z.string().min(5).max(20),
    password: z.string().min(6),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
