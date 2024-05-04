import Input from "@/components/Input";
import styles from "./page.module.scss";
import signIn from "@/auth/actions/sign-in";
import { H1 } from "@/components/Typography";
import validateRequest from "@/auth/actions/validate";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/group");
  }

  return (
    <div className={styles["sign-up__background"]}>
      <div className={styles["sign-up__container"]}>
        <H1>Sign in</H1>
        <form action={signIn}>
          <Input name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <button className={styles["button"]} type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
