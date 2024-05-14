import { redirectIfIsSession } from "~/lib/auth/redirects";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectIfIsSession();

  return children;
}
