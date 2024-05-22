import type { FC } from "react";

import { Logo } from "../logo";

export const PageLoader: FC = ({}) => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <Logo size="lg" className="animate-bounce" />
      </div>
    </>
  );
};
