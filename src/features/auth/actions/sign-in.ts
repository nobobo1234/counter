"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia } from "@/features/auth/auth";
import { prisma } from "@/db";
import verifyToken from "../recaptcha";

export default async function signIn(formData: FormData) {
  const recaptchaToken = formData.get("g-recaptcha-response") as string;
  const recaptchaResponse = await verifyToken(recaptchaToken);

  if (!recaptchaResponse.success) {
    return {
      error: {
        recaptcha: recaptchaResponse.message,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: formData.get("email") as string,
    },
  });

  if (!user) {
    // add a delay here to prevent timing attacks
    await new Argon2id().verify("password", "password");

    return {
      error: "Invalid email or password",
    };
  }

  const passwordHash = user.password;
  const password = formData.get("password") as string;

  const isValid = await new Argon2id({
    memorySize: 19456,
    iterations: 2,
    parallelism: 1,
    tagLength: 32,
  }).verify(passwordHash, password);

  if (!isValid) {
    return {
      error: "Invalid email or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const cookie = lucia.createSessionCookie(session.id);

  cookies().set(cookie.name, cookie.value, cookie.attributes);

  return redirect("/");
}
