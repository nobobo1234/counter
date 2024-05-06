import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  if (user) {
    return redirect("/group");
  }
}
