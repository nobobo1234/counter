"use client";
import styles from "./page.module.scss";
import Input from "@/components/Input";
import signIn from "@/features/auth/actions/sign-in";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Form() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("sign_in");

    formData.append("g-recaptcha-response", gRecaptchaToken);
    signIn(formData);
  };

  return (
    <form className={styles["sign-up__form"]} action={handleSubmit}>
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
        Log in
      </button>
    </form>
  );
}
