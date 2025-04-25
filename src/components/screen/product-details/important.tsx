import React from "react";
import parse from "html-react-parser";

type Props = {important_info:string};

export default function Important({important_info}: Props) {
  return (
    <div className="container-md">
      <p className=" font-semibold text-muted-foreground mb-3">
        Please note:
      </p>
      <div className="text-sm">
      {parse(important_info || "")}

      </div>
    </div>
  );
}
