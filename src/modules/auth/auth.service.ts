import bcrypt from 'bcrypt';

import { db } from '@/config/db';
import { HandleHttpError } from '@/middlewares/httpError.middleware';

async function findUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return !!user;
}

async function comparePassword(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  const passwordMatch = await bcrypt.compare(password, user?.password || '');
  return passwordMatch;
}

export async function registerUser(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) {
  try {
    if (await findUserByEmail(email)) {
      throw new HandleHttpError(400, 'Email already taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.user.create({
      data: { firstname, lastname, email, password: hashedPassword },
    });

    return user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new HandleHttpError(500, e.message);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    if (
      !(await findUserByEmail(email)) ||
      !(await comparePassword(email, password))
    ) {
      throw new HandleHttpError(400, "Email and password doesn't match.");
    }

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, firstname: true, lastname: true },
    });
    return user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new HandleHttpError(500, e.message);
  }
}
