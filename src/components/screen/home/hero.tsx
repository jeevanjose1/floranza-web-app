"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetSlide } from "@/services/queries/home";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";


export default function Hero() {
  const { data: slide_date, isLoading } = useGetSlide();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <section className="relative   aspect-3/2  tablet-lg:aspect-8/3  mb-12">
      <div className="w-full absolute h-full">
        <Carousel
          className="w-full h-full "
          opts={{
            loop: true,
            duration: 50,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
            Fade({
              active: true,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {slide_date?.data?.map((item: any) => {
              return (
                <CarouselItem key={item?.subTitle} className="h-full  ">
                  <div
                    className={` w-full  aspect-3/2  tablet-lg:aspect-8/3 flex relative    items-center justify-center transition-opacity duration-500`}
                  >
                    <div className="container text-white relative z-2">
                      <h2 className=" text-xl tablet:text-2xl font-medium mb-1">
                        {item?.subTitle}
                      </h2>
                      <h1 className=" text-3xl tablet:text-6xl font-bold mb-3">
                        {item?.headTitle}
                      </h1>
                      <Button size={"sm"} variant={"primary"}>
                        {item?.buttonTitle}
                      </Button>
                    </div>

                    <div className="absolute w-full h-full bg-gradient-to-r from-black/70 to-gray-0 z-1" />
                    <Image
                      src={item?.image}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className="w-full absolute top-0 left-0  h-full object-cover"
                      alt="hero"
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-8 right-[8%] flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className="group flex items-center justify-center"
              onClick={() => api?.scrollTo(index)}
            >
              <div
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === current
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 group-hover:bg-white/70"
                }`}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Dots indicator in bottom right */}

      <div className="container mx-auto absolute inset-0 pointer-events-none flex items-center justify-center"></div>
    </section>
  );
}
