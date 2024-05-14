import { AuthPage } from "~/components/Auth/auth-page";
import { RegisterForm } from "~/components/Auth/register-form";

export function generateMetadata() {
  return {
    title: "Stwórz konto",
  };
}

export default function RegisterPage() {
  return (
    <AuthPage>
      <RegisterForm />
    </AuthPage>
  );
}
