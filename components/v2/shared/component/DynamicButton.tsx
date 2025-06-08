import React from "react";

export interface DynamicButtonProps {
	text: string;
	icon?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
	href?: string;
	download?: boolean;
	className?: string;
	style?: React.CSSProperties;
	as?: "button" | "a";
	target?: string;
	rel?: string;
	type?: "button" | "submit" | "reset";
	iconPosition?: "left" | "right";
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
	text,
	icon,
	onClick,
	href,
	download,
	className = "",
	style = {},
	as,
	target,
	rel,
	type = "button",
	iconPosition = "right",
}) => {
	const content = (
		<>
			{icon && iconPosition === "left" && (
				<span style={{ display: "inline-block", marginRight: 10 }}>{icon}</span>
			)}
			<span>{text}</span>
			{icon && iconPosition === "right" && (
				<span style={{ display: "inline-block", marginLeft: 10 }}>{icon}</span>
			)}
		</>
	);
	if (href) {
		return (
			<a
				href={href}
				download={download}
				className={className}
				style={style}
				onClick={onClick}
				target={target}
				rel={rel}
			>
				{content}
			</a>
		);
	}
	return (
		<button type={type} className={className} style={style} onClick={onClick}>
			{content}
		</button>
	);
};

export default DynamicButton;
