import type { FC } from "react";

export const GamesTableLoader: FC = ({}) => {
  return (
    <div className="py-12 flex-col flex items-center">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="w-full flex items-center justify-center h-[82px]"
        >
          <div
            className="w-full h-[54px] flex items-center justify-center bg-slate-300 dark:bg-slate-800 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        </div>
      ))}
    </div>
  );
};
