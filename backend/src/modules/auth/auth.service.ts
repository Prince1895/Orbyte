import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { RegisterInput } from "./auth.types";

const prisma = new PrismaClient();

export async function registerUser(data: RegisterInput) {
  const { email, username, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      credentials: {
        create: {
          provider: "LOCAL",
          password_hash: passwordHash
        }
      }
    },
    include: {
      credentials: true
    }
  });

  return user;
}
