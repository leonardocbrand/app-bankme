import { z } from 'zod';

export const updateUserSchema = z.object({
  login: z.string().min(5).max(20).optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
