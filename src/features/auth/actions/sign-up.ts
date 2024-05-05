"use server";
import { prisma } from "@/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/features/auth/auth";
import { redirect } from "next/navigation";

interface Result {
  error: string;
}

export default async function singUp(formData: FormData): Promise<Result> {
  // TODO: Add zod validation
  const email = formData.get("email") as string;
  if (typeof email !== "string" || !email.includes("@")) {
    return {
      error: "Invalid email",
    };
  }

  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;
  if (password !== passwordConfirmation) {
    return {
      error: "Passwords do not match",
    };
  }

  // TODO: Add zxcvbn password strength validation
  if (typeof password !== "string" || password.length < 8) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await new Argon2id({
    memorySize: 19456,
    iterations: 2,
    parallelism: 1,
    tagLength: 32,
  }).hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const cookie = lucia.createSessionCookie(session.id);

  cookies().set(cookie.name, cookie.value, cookie.attributes);

  return redirect("/");
}
