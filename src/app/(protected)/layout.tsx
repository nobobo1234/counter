import { redirect } from "next/navigation";
import validateRequest from "@/features/auth/actions/validate";
import Navbar from "@/components/Navbar";
import NavButton from "@/components/Navbar/NavButton";
import styles from "./layout.module.scss";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const isAdmin = user.userType === "admin";

  return (
    <div className={styles.container}>
      <Navbar isAdmin={isAdmin} />
      {children}
    </div>
  );
}
