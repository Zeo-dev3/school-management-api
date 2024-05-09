import { z } from 'zod';

export const LoginSchema = z.object({
  name: z.string().min(2),
  pin: z.string().max(6).min(6),
});

export type LoginDto = z.infer<typeof LoginSchema>;
