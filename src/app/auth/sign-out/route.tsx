import logout from "@/features/auth/actions/logout";

export async function GET() {
  return logout();
}
