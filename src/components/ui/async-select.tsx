'use client'

import React from "react";
import AsyncSelect, { type AsyncProps } from "react-select/async";
import type {  GroupBase } from "react-select";

export type OptionType = {
  label: string;
  value: string;
};

type AsyncSelectCustomProps = AsyncProps<
  OptionType,
  boolean,
  GroupBase<OptionType>
>;

export default function AsyncSelectCustom(props: AsyncSelectCustomProps) {
  return (
    <AsyncSelect
      classNames={{
        container:() => "!w-full z-20",

        control: (state) =>
          `!min-h-10 !rounded-full  ${
            state.isFocused ? "!border-ring !ring-1 !ring-ring" : ""
          }`,
        valueContainer: (state) => `  ${(state.hasValue && state.isMulti) ? '!px-2':'px-6'} min-h-8    !text-sm`,
        placeholder: () => "text-sm px-2 whitespace-nowrap",
        input: () => `m-0 px-2 `,
        indicatorsContainer: () => "h-10 px-2 has-[span]:hidden rounded-xl",
        menu: () => " !rounded-md p-1.5",
        option: (state) =>
          ` ${state.isFocused ? "!bg-muted/30 text-black" : ""} ${
            state.isSelected ? "!bg-muted/50 !text-black" : ""
          } !text-sm rounded-sm `,
        menuList: () => "!py-0 ",
        multiValue:()=>'!rounded-sm',
        singleValue:()=>'bg-muted px-2 text-xs py-1 rounded-full !max-w-min'

      }}
      {...props}
    />
  );
}
