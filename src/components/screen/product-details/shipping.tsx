import React from "react";
import parse from "html-react-parser";

type Props = {shipping_info:string};

export default function Shipping({shipping_info}: Props) {
  return (
    <div className="container-md">
      <div className="text-sm font-medium text-muted-foreground/80 ">
        {parse(shipping_info || "")}
      </div>
    </div>
  );
}
