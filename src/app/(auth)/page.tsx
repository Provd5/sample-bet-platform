import { AuthPage } from "~/components/Auth/auth-page";
import { LoginForm } from "~/components/Auth/login-form";

export default function HomePage() {
  return (
    <>
      <AuthPage isLogin>
        <LoginForm />
      </AuthPage>
    </>
  );
}
