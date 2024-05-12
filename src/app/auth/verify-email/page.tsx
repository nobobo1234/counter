import Input from "@/components/Input";
import styles from "../sign-in/page.module.scss";
import { H1 } from "@/components/Typography";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/db";
import {
  generateVerificationCode,
  sendVerificationEmail,
} from "@/features/auth/email_verification";
import RequestNew from "./requestNew";
import VerifyForm from "./verifyForm";

export default async function VerifyEmail() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/auth/sign-in");
  }

  if (user.emailConfirmed) {
    redirect("/group");
  }

  // Find the createdAt date of the verification
  const verification = await prisma.emailConfirmation.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      createdAt: true,
    },
  });

  if (!verification) {
    const code = await generateVerificationCode(user.id, user.email);
    await sendVerificationEmail(user.email, code);
    return redirect("/auth/verify-email");
  }

  const onClick = async () => {
    "use server";
    const fiveMinutes = 5 * 60 * 1000;
    const createdAt = new Date(verification.createdAt).getTime();
    const olderThan5Minutes = Date.now() - createdAt > fiveMinutes;
    console.log("hoi");

    if (olderThan5Minutes) {
      const code = await generateVerificationCode(user.id, user.email);
      await sendVerificationEmail(user.email, code);
    }
  };

  return (
    <div className={styles["sign-up__background"]}>
      <div className={styles["sign-up__container"]}>
        <H1>Verifieer email</H1>
        <p className={styles["sign-up__text"]}>
          We hebben een code naar je email gestuurd. Vul deze hier in om je
          email te verifiëren.
        </p>
        <RequestNew timeCreated={verification.createdAt} onClick={onClick} />
        <VerifyForm />
      </div>
    </div>
  );
}
