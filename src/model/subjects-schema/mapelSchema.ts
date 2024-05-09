import { z } from 'zod';

export const MapelSchema = z.object({
  mapel: z.string().nonempty(),
});

export type MapelDto = z.infer<typeof MapelSchema>;
