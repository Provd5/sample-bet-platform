import { AuthPage } from "~/components/Auth/auth-page";
import { RegisterForm } from "~/components/Auth/register-form";

export default function RegisterPage() {
  return (
    <AuthPage>
      <RegisterForm />
    </AuthPage>
  );
}
