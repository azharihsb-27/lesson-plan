'use server';

import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// Create new user
export async function CreateUserIfNull() {
  try {
    // Get user from Kinde
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (user) {
      // Check if user already exists else return success: false
      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      // If user already exists return success: true else create new user data then return: true
      if (existingUser) {
        return { success: true };
      } else {
        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email!,
            name: user.given_name + ' ' + user.family_name,
          },
        });

        return { success: true };
      }
    }

    return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
