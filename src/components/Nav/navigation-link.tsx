"use client";

import type { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavigationLink: FC<NavigationLinkProps> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row-reverse gap-1 items-center rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border border-input bg-background",
        pathname.endsWith(href) &&
          "bg-primary text-background pointer-events-none"
      )}
      tabIndex={pathname.endsWith(href) ? -1 : 0}
    >
      {children}
    </Link>
  );
};
