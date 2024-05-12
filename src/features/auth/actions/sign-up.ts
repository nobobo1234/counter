"use server";
import { prisma } from "@/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  generateVerificationCode,
  sendVerificationEmail,
} from "../email_verification";
import verifyToken from "../recaptcha";

const signUp = z
  .object({
    email: z.string().email().max(255),
    password: z.string().min(8).max(255),
    passwordConfirmation: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Wachtwoorden komen niet overeen",
  });

export default async function singUp(formData: FormData) {
  const recaptchaToken = formData.get("g-recaptcha-response") as string;
  const recaptchaResponse = await verifyToken(recaptchaToken);

  if (!recaptchaResponse.success) {
    return { error: { recaptcha: recaptchaResponse.message } };
  }

  // TODO: Add zod validation
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  const validated = signUp.safeParse({
    email,
    password,
    passwordConfirmation,
  });

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
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
      emailConfirmed: false,
    },
  });

  const verificationCode = await generateVerificationCode(user.id, email);
  await sendVerificationEmail(email, verificationCode);

  const session = await lucia.createSession(user.id, {});
  const cookie = lucia.createSessionCookie(session.id);

  cookies().set(cookie.name, cookie.value, cookie.attributes);

  return redirect("/");
}
