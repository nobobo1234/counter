import { redirect } from "next/navigation";
import validateRequest from "@/features/auth/actions/validate";
import Navbar from "@/components/Navbar";
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

  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
}
