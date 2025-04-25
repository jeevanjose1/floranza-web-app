import React from "react";


export default function Additional() {
  return (
    <div className="container-md">
      <div className=" tablet-lg:w-2xl laptop:w-4xl w-full">
        <div className="flex items-center mb-5  justify-between">
          <p className="text-sm font-medium text-muted-foreground/90">Weight</p>{" "}
          <p className="text-sm font-medium text-muted-foreground/80">.306 kg</p>
        </div>
        <div className="flex items-center mb-5  justify-between">
          <p className="text-sm font-medium text-muted-foreground/90">Dimensions</p>{" "}
          <p className="text-sm font-medium text-muted-foreground/80">5 x 5 x 5 cm</p>
        </div>
        <div className="flex items-center mb-5  justify-between">
          <p className="text-sm font-medium text-muted-foreground/90">Hsn</p>{" "}
          <p className="text-sm font-medium text-muted-foreground/80">636</p>
        </div>
        <div className="flex items-center mb-5  justify-between">
          <p className="text-sm font-medium text-muted-foreground/90">Material</p>{" "}
          <p className="text-sm font-medium text-muted-foreground/80">Silk</p>
        </div>
        <div className="flex items-center mb-5  justify-between">
          <p className="text-sm font-medium text-muted-foreground/90">Size</p>{" "}
          <p className="text-sm font-medium text-muted-foreground/80">M, L, LG, XL</p>
        </div>
      </div>
    </div>
  );
}
