import React from "react";
import styles from "@/styles";
import Image from "next/image";
import { V1SkillIconProps } from "./types";

const SkillIcon: React.FC<V1SkillIconProps> = ({ name, url }) => {
	return (
		<Image
			src={url}
			alt={name}
			width={20}
			height={20}
			className={`${styles.skillsIcon}`}
		/>
	);
};

export default SkillIcon;