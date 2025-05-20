import React from "react";

type Props = { description: string };

export default function Description({ description }: Props) {

	return (
		<div className="container-md">
			<p className="text-sm font-medium text-muted-foreground/80">{description}</p>
		</div>
	);
}
