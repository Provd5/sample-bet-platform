import type { FC } from "react";

import { cn } from "~/lib/utils";

interface ResultCardItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ResultCardItem: FC<ResultCardItemProps> = ({
  children,
  className,
}) => {
  return (
    <p
      className={cn(
        "flex items-center justify-center px-3 w-24 sm:w-32",
        className
      )}
    >
      {children}
    </p>
  );
};
