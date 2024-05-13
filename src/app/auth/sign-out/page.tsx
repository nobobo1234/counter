import logout from "@/features/auth/actions/logout";

export default async function Page() {
  await logout();

  return <div>You are being logged out...</div>;
}
