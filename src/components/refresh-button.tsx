"use client";

import { type FC, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, RotateCw } from "lucide-react";

import { cn } from "~/lib/utils";

import { Button } from "./ui/button";

interface DefaultRefreshButton {
  variant?: "default";
  className?: never;
  children?: never;
}

interface CustomRefreshButton {
  variant: "custom";
  className?: string;
  children: React.ReactNode;
}

export const RefreshButton: FC<DefaultRefreshButton | CustomRefreshButton> = ({
  className,
  variant = "default",
  children,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    setIsLoading(true);
    router.refresh();
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  return (
    <Button
      className={cn(
        variant === "custom" ? className : "w-11/12 max-w-sm self-center",
      )}
      variant={"outline"}
      onClick={() => refresh()}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="size-5 shrink-0 animate-spin" />
      ) : variant === "custom" ? (
        children
      ) : (
        <>
          <RotateCw className="mr-1 size-5 shrink-0" />
          Odśwież
        </>
      )}
    </Button>
  );
};
