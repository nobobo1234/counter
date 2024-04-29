import signUp from "@/auth/actions/sign-up";
import styles from "./page.module.scss";
import { H1 } from "@/components/Typography";
import Input from "@/components/Input";

export default function Page() {
  return (
    <div className={styles["sign-up__background"]}>
      <div className={styles["sign-up__container"]}>
        <H1>Sign up</H1>
        <form action={signUp}>
          <Input name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
          />
          <button className={styles["button"]} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
