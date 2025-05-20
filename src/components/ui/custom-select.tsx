'use client'

import React from "react";
import Select from "react-select";



export default function CustomSelect(props: any) {
  return (
    <Select
      
      classNames={{
        container: () => "!w-full z-20",
        control: (state) =>
          `!min-h-8 !rounded-md ${
            state.isFocused ? "!border-ring !ring-1 !ring-ring" : ""
          }`,
        valueContainer: (state) => `${(state.hasValue && state.isMulti) ? '!px-2':'px-6'} min-h-8 !text-sm`,
        placeholder: () => "text-sm px-2 whitespace-nowrap",
        input: () => "m-0 px-2",
        indicatorsContainer: () => "h-8 px-2 rounded-xl", // Removed the has-[span]:hidden which might be hiding indicators
        menu: () => "!rounded-md p-1.5",
        option: (state) =>
          `${state.isFocused ? "!bg-muted/30 text-black" : ""} ${
            state.isSelected ? "!bg-muted/50 !text-black" : ""
          } !text-sm rounded-sm cursor-pointer`, // Added cursor-pointer for better UX
        menuList: () => "!py-0 max-h-60 overflow-auto", // Added max-height and overflow
        multiValue: () => "!rounded-sm",
      }}
      {...props}
    />
  );
}