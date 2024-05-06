import Input from "@/components/Input";
import styles from "./page.module.scss";
import signIn from "@/features/auth/actions/sign-in";
import { H1 } from "@/components/Typography";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import Link from "next/link";

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
        <form className={styles["sign-up__form"]} action={signIn}>
          <Input
            className={styles["sign-up__input"]}
            name="email"
            placeholder="Email"
          />
          <Input
            className={styles["sign-up__input"]}
            type="password"
            name="password"
            placeholder="Wachtwoord"
          />
          <button className={styles["button"]} type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
