import { z } from 'zod';

export const CanteenCategorySchema = z.object({
  name: z.string().nonempty('Name cannot be empty'),
});

export type CanteenCategoryDto = z.infer<typeof CanteenCategorySchema>;
