"use client";

import type { FC } from "react";
import Link from "next/link";

import { CURRENT_EVENT } from "~/constants/current-event";
import ROUTES from "~/constants/routes";

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
      <div className="mx-auto mb-12 mt-6 h-fit w-full max-w-lg px-6">
        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Zaloguj się" : "Utwórz konto"}</CardTitle>
            <CardDescription>{`Betowanie - ${CURRENT_EVENT}`}</CardDescription>
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
