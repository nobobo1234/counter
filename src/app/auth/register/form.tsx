"use client";
import styles from "../sign-in/page.module.scss";
import signUp from "@/features/auth/actions/sign-up";
import Input from "@/components/Input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Form() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("sign_up");

    formData.append("g-recaptcha-response", gRecaptchaToken);
    signUp(formData);
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
  );
}
