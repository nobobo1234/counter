"use server";
import { redirect } from "next/navigation";
import validateRequest from "./validate";
import { prisma } from "@/db";
import verifyToken from "../recaptcha";

export default async function verifyCode(
  _: { message: string },
  formData: FormData
) {
  const recaptchaToken = formData.get("g-recaptcha-response") as string;
  const recaptchaResponse = await verifyToken(recaptchaToken);

  if (!recaptchaResponse.success) {
    return {
      message: recaptchaResponse.message,
    };
  }

  const { user } = await validateRequest();
  if (!user) {
    return {
      message: "User not found",
    };
  }

  const verify = await prisma.emailConfirmation.findFirst({
    where: {
      userId: user.id,
      code: formData.get("code") as string,
    },
  });

  if (!verify) {
    return {
      message: "De code is onjuist",
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailConfirmed: true,
    },
  });

  await prisma.emailConfirmation.delete({
    where: {
      id: verify.id,
    },
  });

  return redirect("/group");
}
