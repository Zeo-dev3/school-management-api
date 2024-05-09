import { z } from 'zod';

export const MateriSchema = z.object({
  name: z.string().nonempty('Name cannot be empty'),
  author: z.string().nonempty('Author cannot be empty'),
  lesson: z.string().nonempty('Lesson cannot be empty'),
  mapelId: z.number().nonnegative('Mapel id cannot be negative'),
});

export type MateriDto = z.infer<typeof MateriSchema>;
