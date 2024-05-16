import { redirectIfSessionUser } from "~/lib/auth/redirects";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectIfSessionUser(false);

  return children;
}
