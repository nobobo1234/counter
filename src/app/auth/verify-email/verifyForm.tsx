"use client";
import styles from "../sign-in/page.module.scss";
import { useFormState } from "react-dom";
import verifyCode from "@/features/auth/actions/verify";
import Input from "@/components/Input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function VerifyForm() {
  const [state, formAction] = useFormState(verifyCode, {
    message: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("verify_email");

    formData.append("g-recaptcha-response", gRecaptchaToken);
    formAction(formData);
  };

  return (
    <form className={styles["sign-up__form"]} action={handleSubmit}>
      <Input
        className={styles["sign-up__input"]}
        name="code"
        placeholder="Code"
      />
      <button className={styles["button"]} type="submit">
        Verifieer
      </button>
      {state.message && (
        <p className={styles["sign-up__message"]}>{state.message}</p>
      )}
    </form>
  );
}
