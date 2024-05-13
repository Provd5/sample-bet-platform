"use client";

import type { FC } from "react";
import Link from "next/link";

import ROUTES from "~/utils/routes";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthPageProps {
  isLogin?: boolean;
  children: React.ReactNode;
}

export const AuthPage: FC<AuthPageProps> = ({ isLogin = false, children }) => {
  return (
    <div className="flex size-full items-center">
      <div className="max-w-lg mx-auto px-6 mt-6 mb-12 w-full h-fit">
        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Zaloguj się" : "Utwórz konto"}</CardTitle>
            <CardDescription>{isLogin ? "💸" : "🤑"}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter>
            {isLogin ? (
              <>
                <span className="mr-1">Nie masz jeszcze konta?</span>
                <Link className="underline" href={ROUTES.register}>
                  Stwórz je!
                </Link>
              </>
            ) : (
              <>
                <span className="mr-1">Masz już konto?</span>
                <Link className="underline" href={ROUTES.root}>
                  Zaloguj się!
                </Link>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
