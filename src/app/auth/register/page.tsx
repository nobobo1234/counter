import signUp from "@/features/auth/actions/sign-up";
import styles from "../sign-in/page.module.scss";
import { H1 } from "@/components/Typography";
import Input from "@/components/Input";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/group");
  }

  return (
    <div className={styles["sign-up__background"]}>
      <div className={styles["sign-up__container"]}>
        <H1>Aanmelden</H1>
        <p className={styles["sign-up__text"]}>
          Heb je al een account?{" "}
          <Link href="/auth/sign-in">Klik hier om in te loggen</Link>
        </p>
        <form className={styles["sign-up__form"]} action={signUp}>
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
          <Input
            className={styles["sign-up__input"]}
            type="password"
            name="passwordConfirmation"
            placeholder="Bevestig wachtwoord"
          />
          <button className={styles["button"]} type="submit">
            Maak aan
          </button>
        </form>
      </div>
    </div>
  );
}
