import { z } from 'zod';

export const CanteenProductSchema = z.object({
  name: z.string().nonempty('Product name cannot be empty'),
  price: z.number().nonnegative('Price cannot be negative omg'),
  stock: z.number().gt(0),
  shopName: z.string().nonempty(),
  categoryId: z.number().nonnegative('Category id cannot be negative'),
});

export type CanteenProductDto = z.infer<typeof CanteenProductSchema>;
