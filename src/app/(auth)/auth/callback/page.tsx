import { RefreshButton } from "~/components/refresh-button";
import { redirectIfSessionUser } from "~/lib/auth/redirects";

export function generateMetadata() {
  return {
    title: "Aktywuj konto",
  };
}

export default async function AuthCallbackPage() {
  await redirectIfSessionUser(true);

  return (
    <>
      <div className="mx-auto flex max-w-xl flex-col gap-12 px-3 py-12">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Konto jeszcze nie aktywowane ☹️</h1>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h1 className="text-lg leading-tight">
              Konto powinno być już aktywne? Spróbuj odświeżyć!
            </h1>
          </div>
          <RefreshButton />
        </div>
      </div>
    </>
  );
}
