// npx prisma generate - npx prisma db push
import { PrismaClient } from '@prisma/client';

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
