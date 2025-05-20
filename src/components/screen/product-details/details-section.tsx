"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Description from "./description";
import Important from "./important";
import Shipping from "./shipping";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Additional from "./additional";

type Props = {product:any};

export default function DetailsSection({product}: Props) {
  console.log('====================================');
  console.log(product);
  console.log('====================================');
  const [tab, setTab] = useState(1);
  const handleSetTab = (value: number) => setTab(value);
  return (
    <div className="w-full border-t mt-6 flex flex-col items-center ">
      <div className="hidden items-center tablet-lg:flex gap-4 mb-8">
       
        <Button
          onClick={() => handleSetTab(1)}
          variant={"transparant"}
          className={`relative before:absolute before:content-[""] before:z-10 group ${
            tab === 1 ? "before:w-full" : "before:w-0 "
          } hover:before:w-full cursor-pointer before:transition-all before:top-0 before:left-0 before:h-0.5 before:bg-main border-main text-sm rounded-none`}
        >
          DESCRIPTION
        </Button>
        <Button
          onClick={() => handleSetTab(2)}
          variant={"transparant"}
          className={`relative before:absolute before:content-[""] before:z-10 group ${
            tab === 2 ? "before:w-full" : "before:w-0 "
          } hover:before:w-full cursor-pointer before:transition-all before:top-0 before:left-0 before:h-0.5 before:bg-main border-main text-sm rounded-none`}
        >
          ADDITIONAL INFO
        </Button>
        <Button
          onClick={() => handleSetTab(3)}
          variant={"transparant"}
          className={`relative before:absolute before:content-[""] before:z-10 group ${
            tab === 3 ? "before:w-full" : "before:w-0 "
          } hover:before:w-full cursor-pointer before:transition-all before:top-0 before:left-0 before:h-0.5 before:bg-main border-main text-sm rounded-none`}
        >
          IMPORTANT INFORMATION
        </Button>

        <Button
          onClick={() => handleSetTab(4)}
          variant={"transparant"}
          className={`relative before:absolute before:content-[""] before:z-10 group ${
            tab === 4 ? "before:w-full" : "before:w-0 "
          } hover:before:w-full cursor-pointer before:transition-all before:top-0 before:left-0 before:h-0.5 before:bg-main border-main text-sm rounded-none`}
        >
          SHIPPING AND DELVERY
        </Button>
      </div>
      <div className="tablet-lg:inline-block hidden ">
      {tab === 1 && <Description  description={product?.description} />}
        {tab === 2 && <Additional />}
        {tab === 3 && <Important important_info = {product?.important_info} />}
        {tab === 4 && <Shipping shipping_info={product?.shipping_delivery} />}
      </div>

      <div className="w-full inline-block tablet-lg:hidden">
        <div className="my-4">
          <Description description={product?.description} />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger className="container-md">
              ADDITIONAL INFORMATION
            </AccordionTrigger>
            <AccordionContent>
              <Additional />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="container-md">
              {" "}
              IMPORTANT INFORMATION
            </AccordionTrigger>
            <AccordionContent>
              <Important important_info = {product?.important_info}/>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="container-md">
              {" "}
              SHIPPING AND DELVERY
            </AccordionTrigger>
            <AccordionContent>
              <Shipping shipping_info={product?.shipping_delivery} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
