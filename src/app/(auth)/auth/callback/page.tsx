import { redirectIfSessionUserIsActive } from "~/lib/auth/redirects";

export function generateMetadata() {
  return {
    title: "Aktywuj konto",
  };
}

export default async function AuthCallbackPage() {
  await redirectIfSessionUserIsActive();

  return (
    <>
      <div>AuthCallbackPage</div>
    </>
  );
}
