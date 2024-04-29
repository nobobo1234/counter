import { redirect } from "next/navigation";
import validateRequest from "@/auth/actions/validate";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
