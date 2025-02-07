import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function schemaValidator(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e instanceof ZodError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorMessages = e.errors.map((e: any) => ({
          message: e.message,
        }));
        res.status(400).json({ status: 'error', message: errorMessages });
      } else {
        res.status(500).json({ status: 'error', message: e.message });
      }
    }
  };
}
