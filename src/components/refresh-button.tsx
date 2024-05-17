"use client";

import { type FC, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, RotateCw } from "lucide-react";

import { updateSession } from "~/lib/auth/session";
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

  const refresh = async () => {
    await updateSession();
    setIsLoading(true);
    router.refresh();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Button
      className={cn(
        variant === "custom" ? className : "self-center w-11/12 max-w-sm"
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
          <RotateCw className="size-5 shrink-0 mr-1" />
          Odśwież
        </>
      )}
    </Button>
  );
};
