import { z } from 'zod';

// form zod validation schema
export const userSchema = z.object({
  avatar: z.array(z.string()).optional(),
  name: z.array(z.string()).optional(),
  address: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
  department: z.array(z.string()).optional(),
  division: z.array(z.string()).optional(),
  unit: z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type userInput = z.infer<typeof userSchema>;
