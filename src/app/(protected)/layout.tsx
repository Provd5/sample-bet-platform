import { redirectIfSessionUserIsNotActive } from "~/lib/auth/redirects";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectIfSessionUserIsNotActive();

  return children;
}
