import styles from "@/styles";
import Image from "next/image";
import React from "react";

const SkillIcon = ({ name, url }) => {
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
