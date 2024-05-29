import type { FC } from "react";
import { LoaderCircle } from "lucide-react";

export const ButtonLoadingSpinner: FC = ({}) => {
  return <LoaderCircle className="ml-1 size-4 shrink-0 animate-spin" />;
};
