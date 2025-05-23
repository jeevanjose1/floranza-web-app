import React from "react";
import parse from "html-react-parser";

type Props = { description: string };

export default function Description({ description }: Props) {

	return (
		<div className="container-md !text-sm">
				{parse(description || "")}
		</div>
	);
}
