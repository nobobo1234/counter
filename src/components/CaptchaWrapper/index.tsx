"use client";
import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function CaptchaWrapper({ children }: { children: ReactNode }) {
  const recaptchaKey: string | undefined =
    process?.env?.NEXT_PUBLIC_SITE_KEY_RECAPTCHA || "NOT DEFINEDED";

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
