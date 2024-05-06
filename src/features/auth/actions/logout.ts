"use server";
import { cookies } from "next/headers";
import { lucia } from "../auth";
import validateRequest from "./validate";
import { redirect } from "next/navigation";

export default async function logout() {
  const { user } = await validateRequest();
  if (!user) {
    return {
      status: 401,
      body: { message: "Unauthorized" },
    };
  }

  await lucia.invalidateSession(user.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth/sign-in");
}
