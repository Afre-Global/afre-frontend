import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/shared/ui";
import React from "react";

export type ProductCarouselProps = {
  imageUrls?: string[];
};

export function ProductCarousel(props: ProductCarouselProps) {
  const [topCarouselApi, setTopCarouselApi] = React.useState<CarouselApi>();
  const [bottomCarouselApi, setBottomCarouselApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!topCarouselApi) {
      return;
    }

    topCarouselApi.on("select", () => {
      setCurrent(topCarouselApi.selectedScrollSnap());
    });
  }, [topCarouselApi]);

  React.useEffect(() => {
    bottomCarouselApi?.scrollTo(current);
    topCarouselApi?.scrollTo(current);
  }, [current, bottomCarouselApi, topCarouselApi]);

  return (
    <div className="w-full space-y-5">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full bg-gray-200 rounded-md overflow-clip"
        setApi={setTopCarouselApi}
      >
        <CarouselContent>
          {props.imageUrls?.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="w-full relative h-80 ">
                <Image
                  src={imageUrl}
                  alt="Picture of the author"
                  style={{
                    objectFit: "contain",
                  }}
                  priority
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 " />
        <CarouselNext className="right-4" />
      </Carousel>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
        setApi={setBottomCarouselApi}
      >
        <CarouselContent className="px-10 md:px-20">
          {props.imageUrls?.map((imageUrl, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/5">
              <div
                className="w-full relative h-20 "
                onClick={() => {
                  setCurrent(index);
                }}
              >
                {index === current && (
                  <div className="relative z-10 top-0 bottom-0 right-0 left-0 bg-black opacity-50 w-full h-full" />
                )}
                <Image
                  src={imageUrl}
                  alt="Picture of the author"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 " />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
