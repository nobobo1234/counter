import styles from "./page.module.scss";
import { H1 } from "@/components/Typography";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import Link from "next/link";
import Form from "./form";

export default async function SignIn() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/group");
  }

  return (
    <div className={styles["sign-up__background"]}>
      <div className={styles["sign-up__container"]}>
        <H1>Log in</H1>
        <p className={styles["sign-up__text"]}>
          Heb je nog geen account?{" "}
          <Link href="/auth/register">Klik hier om een account te maken</Link>
        </p>
        <Form />
      </div>
    </div>
  );
}
