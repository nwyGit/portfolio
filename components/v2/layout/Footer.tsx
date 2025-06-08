import { FC } from "react";
import SocialLinks from "@/components/v2/shared/component/SocialLinks";

const Footer: FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-left">
					<span className="footer-follow">Follow Me</span>
					<SocialLinks />
				</div>
				<div className="footer-right">
					<span className="footer-name">Raymond Ng</span>
					<div className="footer-line"></div>
					<span className="footer-copyright">Copyright © {currentYear}</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
