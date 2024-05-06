import { Kelas } from '@prisma/client';

export class RegisterUserDTO {
  name: string;
  pin: string;
  alamat?: string;
  kelas: Kelas;
}
