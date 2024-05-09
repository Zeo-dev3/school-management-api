import { z } from 'zod';

export const KelasEnum = z.enum([
  'KELAS_10_SMA',
  'KELAS_11_SMA',
  'KELAS_12_SMA',
]);

export const RegisterUserSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(50),
  pin: z.string().min(6).max(6),
  coins: z.number().int().default(0).optional(),
  creditScore: z.number().int().default(100).optional(),
  alamat: z.string().optional(),
  kelas: KelasEnum,
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
