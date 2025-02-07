import { Response } from 'express';

export class HandleHttpError extends Error {
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleHttpError(e: any, res: Response) {
  const { statusCode, message } = e;
  res.status(statusCode).json({ status: 'error', statusCode, message });
}
