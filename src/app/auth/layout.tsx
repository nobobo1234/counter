import CaptchaWrapper from "@/components/CaptchaWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CaptchaWrapper>{children}</CaptchaWrapper>;
}
