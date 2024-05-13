import type { FC } from "react";
import type react from "react";
import Link from "next/link";
import { Award, Goal, type LucideProps } from "lucide-react";

import { auth } from "~/lib/firebase";
import ROUTES from "~/utils/routes";

import { Logout } from "../Auth/logout";

export const NavigationLinks: FC = ({}) => {
  if (!auth.currentUser) return;

  return (
    <nav>
      <div className="flex gap-1 items-center">
        <NavigationLink Icon={Goal} href={ROUTES.betting}>
          Mecze
        </NavigationLink>
        <NavigationLink Icon={Award} href={ROUTES.results}>
          Punkty
        </NavigationLink>
        <Logout />
      </div>
    </nav>
  );
};

interface NavigationLinkProps {
  Icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>
  >;
  href: string;
  children: React.ReactNode;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  Icon,
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="flex flex-row-reverse gap-1 items-center rounded-md py-3 p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border border-input bg-background"
    >
      <Icon className="size-4" />
      <span>{children}</span>
    </Link>
  );
};
