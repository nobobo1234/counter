import styles from "../sign-in/page.module.scss";
import { H1 } from "@/components/Typography";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignUpForm from "./form";

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
        <SignUpForm />
      </div>
    </div>
  );
}
