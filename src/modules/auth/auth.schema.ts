import { z } from 'zod';

export const RegisterUserSchema = z.object({
  firstname: z.string({ required_error: 'Firstname is required.' }),
  lastname: z.string({ required_error: 'Lastname is required.' }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(6, { message: 'Password must be 6 characters or more.' }),
});

export const LoginUserSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }),
  password: z.string({ required_error: 'Password is required.' }),
});
