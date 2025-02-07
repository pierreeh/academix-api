import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number | string;
      CORS_ORIGIN: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}
