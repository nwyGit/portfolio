import React from "react";
import styles from "@/styles";
import SkillIcon from "./SkillIcon";
import { V1SkillIconProps } from "./types";

const Skill: React.FC<V1SkillIconProps> = ({ name, url }) => {
	return (
		<div className={`${styles.skillsItem}`}>
			<SkillIcon name={name} url={url} />
			<span className="text-black ml-1">{name}</span>
		</div>
	);
};

export default Skill;