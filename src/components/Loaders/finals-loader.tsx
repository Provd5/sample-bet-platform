import type { FC } from "react";

import { Button } from "../ui/button";
import { ButtonLoadingSpinner } from "./button-loading-spinner";

export const FinalsLoader: FC = ({}) => {
  return (
    <div className="flex justify-end">
      <Button disabled>
        Finaliści <ButtonLoadingSpinner />
      </Button>
    </div>
  );
};
