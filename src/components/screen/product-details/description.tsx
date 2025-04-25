import React from "react";
// import parse from "html-react-parser";

type Props = { description: string };

export default function Description({ description }: Props) {
  // const parsedContent = parse(description);

  return (
    <div className="container-md">
      {/* <div className="text-sm">
        {Array.isArray(parsedContent) ? (
          <>
            <div className="mb-2">{parsedContent[0]}</div>

            {parsedContent.length > 2 && parsedContent[2]}
          </>
        ) : (
          parsedContent
        )}
      </div> */}
    </div>
  );
}
