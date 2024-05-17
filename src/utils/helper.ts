import * as bcrypt from 'bcrypt';

export async function hashPin(rawPassword: string, saltRounds: number) {
  return await bcrypt.hash(rawPassword, saltRounds);
}

export async function compareHash(rawPin: string, hashedPin: string) {
  return await bcrypt.compare(rawPin, hashedPin);
}
