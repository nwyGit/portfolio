import React from "react";

const Overlay = ({ opacity }) => {
	return (
		<div
			className={`absolute top-0 w-full h-full lg:right-0 ${
				opacity == "project"
					? "bg-[#023047]/90 lg:bg-[#023047]/70"
					: "bg-[#023047]/50"
			} lg:hover:bg-[#023047]/0`}
		/>
	);
};

export default Overlay;
