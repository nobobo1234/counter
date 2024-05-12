import { redirect } from "next/navigation";
import validateRequest from "@/features/auth/actions/validate";
import Navbar from "@/components/Navbar";
import NavButton from "@/components/Navbar/NavButton";
import styles from "./layout.module.scss";
import { H1 } from "@/components/Typography";
import Link from "next/link";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!user.emailConfirmed) {
    redirect("/auth/verify-email");
  }

  const isAdmin = user.userType === "admin";

  return (
    <div className={styles.container}>
      <Navbar isAdmin={isAdmin} isLoggedIn={!!user} />
      {children}
    </div>
  );
}
