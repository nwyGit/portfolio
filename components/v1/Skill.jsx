import styles from "@/styles";
import React from "react";
import SkillIcon from "./SkillIcon";

const Skill = ({ name, url }) => {
	return (
		<div className={`${styles.skillsItem}`}>
			<SkillIcon name={name} url={url} />
			<span className="text-black ml-1">{name}</span>
		</div>
	);
};

export default Skill;
