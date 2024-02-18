import { z } from 'zod';

export const createAssignorSchema = z
  .object({
    document: z.string().min(11).max(30),
    email: z.string().email().max(140),
    phone: z.string().max(20),
    name: z.string().max(140),
  })
  .required();

export type CreateAssignorDto = z.infer<typeof createAssignorSchema>;
