import type { FC } from "react";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

interface ModalCarouselProps {
  children: React.ReactNode;
}

export const ModalCarousel: FC<ModalCarouselProps> = ({ children }) => {
  return (
    <Carousel orientation="vertical" opts={{ dragFree: true }}>
      <CarouselContent className="max-h-[420px] cursor-grab">
        {children}
      </CarouselContent>
      <CarouselPrevious type="button" className="-bottom-14 left-3 top-auto" />
      <CarouselNext type="button" className="-bottom-14 left-12 top-auto" />
    </Carousel>
  );
};
