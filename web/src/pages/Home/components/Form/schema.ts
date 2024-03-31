import { z } from 'zod';

export const loginFormSchema = z.object({
  login: z.string().min(5, 'Username has to be greater then 5 characters')
    .max(20, 'Username has to be less then 20 characters'),
  password: z.string().min(6, 'Password has to be greater then 6 characters'),
}).required();

export type LoginFormData = z.infer<typeof loginFormSchema>;
