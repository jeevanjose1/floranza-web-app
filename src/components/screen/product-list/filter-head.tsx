import AsyncSelectCustom from "@/components/ui/async-select";
import { Button } from "@/components/ui/button";
import { images } from "@/shared/images/images";
import Image from "next/image";
import React from "react";


export default function FilterHead() {
  return (
    <div className="w-full container-md  mb-8">
      <div className="grid w-full mobile-lg:grid-cols-2 tablet-lg:grid-cols-4 gap-3 laptop:gap-6 ">
        <AsyncSelectCustom placeholder="Filter By Size" options={[]} />
        <AsyncSelectCustom placeholder="Filter By Materials" options={[]} />
        <AsyncSelectCustom placeholder="Filter By Catogeries" options={[]} />
        <AsyncSelectCustom placeholder="Filter By Size" options={[]} />
      </div>

      <div className=" w-full items-center gap-4 hidden tablet-lg:flex justify-end mt-2">
        <div className="flex items-baseline">
          <p className="font-semibold text-sm">Show : </p>
          <div className="flex text-[10px] items-center ">
            <Button variant={"transparant"} size={"sm"}>
              12
            </Button>{" "}
            /
            <Button
              variant={"transparant"}
              className="text-faded-gray"
              size={"sm"}
            >
              16
            </Button>{" "}
            /
            <Button
              variant={"transparant"}
              className="text-faded-gray"
              size={"sm"}
            >
              20
            </Button>{" "}
            /
            <Button
              variant={"transparant"}
              className="text-faded-gray"
              size={"sm"}
            >
              24
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2.5 ">
          <Button
            variant={"transparant"}
            className="opacity-70 px-0 hover:opacity-100 transition-all"
            size={"sm"}
          >
            <Image src={images.grid_4} width={18} height={18} alt="grid four" />
          </Button>
          <Button
            variant={"transparant"}
            className="opacity-70 px-0 hover:opacity-100 transition-all"
            size={"sm"}
          >
            <Image src={images.grid_9} width={18} height={18} alt="grid four" />
          </Button>
          <Button
            variant={"transparant"}
            className="opacity-70 px-0 hover:opacity-100 transition-all"
            size={"sm"}
          >
            <Image src={images.grid_16} width={18} height={18} alt="grid four" />
          </Button>
        </div>
      </div>
    </div>
  );
}
